import { ALL_VOCAB_QUESTIONS, validateVocabBank } from '../src/lib/apHumanVocabBank.ts'
import { VOCAB_TERMS } from '../src/lib/apHumanVocab.ts'

const byTerm = new Map()
for (const question of ALL_VOCAB_QUESTIONS) {
  byTerm.set(question.term, (byTerm.get(question.term) ?? 0) + 1)
}

console.log(`Catalog terms: ${VOCAB_TERMS.length}`)
console.log(`Questions: ${ALL_VOCAB_QUESTIONS.length}`)
for (const def of VOCAB_TERMS) {
  console.log(`  ${byTerm.get(def.term) ?? 0}  ${def.term}`)
}

const issues = validateVocabBank()
if (issues.length) {
  console.error(`\n${issues.length} issues:`)
  for (const issue of issues) console.error(`- ${issue.id ?? ''} ${issue.term ?? ''} ${issue.message}`)
  process.exit(1)
}

console.log('\nValidation passed.')
