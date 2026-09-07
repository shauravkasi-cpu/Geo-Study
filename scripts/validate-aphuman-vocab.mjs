import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lib = join(root, 'src', 'lib')

const catalogSrc = readFileSync(join(lib, 'apHumanVocab.ts'), 'utf8')
const catalogTerms = [...catalogSrc.matchAll(/term:\s*'([^']+)'/g)].map((match) => match[1])

const files = readdirSync(lib).filter((name) => name.startsWith('apHumanVocab') && name.endsWith('.ts'))
const questionBlocks = []

for (const file of files) {
  if (file === 'apHumanVocab.ts' || file === 'apHumanVocabBank.ts') continue
  const src = readFileSync(join(lib, file), 'utf8')
  const calls = src.split(/\bq\(/).slice(1)
  for (const call of calls) {
    const id = call.match(/^\s*'([^']+)'/)?.[1]
    const unit = call.match(/^\s*'[^']+',\s*'([^']+)'/)?.[1]
    const term = call.match(/^\s*'[^']+',\s*'[^']+',\s*\n\s*'([^']+)'/)?.[1]
    const prompt = call.match(/^\s*'[^']+',\s*'[^']+',\s*\n\s*'[^']+',\s*\n\s*'((?:\\'|[^'])*)'/)?.[1]
    if (id && term && prompt) {
      questionBlocks.push({ id, unit, term, prompt: prompt.replace(/\\'/g, "'"), file })
    }
  }
}

const byTerm = new Map()
const ids = new Set()
const issues = []

for (const question of questionBlocks) {
  if (ids.has(question.id)) issues.push(`Duplicate id ${question.id}`)
  ids.add(question.id)
  byTerm.set(question.term, (byTerm.get(question.term) ?? 0) + 1)

  const promptNorm = question.prompt.toLowerCase()
  const termNorm = question.term.toLowerCase().replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim()
  if (promptNorm.includes(termNorm)) {
    issues.push(`${question.id}: prompt contains term "${question.term}"`)
  }
}

console.log(`Catalog terms: ${catalogTerms.length}`)
console.log(`Parsed questions: ${questionBlocks.length}`)
console.log('Coverage:')
for (const term of catalogTerms) {
  const count = byTerm.get(term) ?? 0
  console.log(`  ${count}  ${term}`)
  if (count < 3) issues.push(`${term}: expected 3+ questions, found ${count}`)
}

for (const term of byTerm.keys()) {
  if (!catalogTerms.includes(term)) issues.push(`Unknown term in questions: ${term}`)
}

if (issues.length) {
  console.error(`\n${issues.length} issues:`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('\nValidation passed.')
