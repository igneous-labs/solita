import { Idl, Solita } from '../../src/solita'
import test from 'tape'
import path from 'path'
import {
  verifySyntacticCorrectnessForGeneratedDir,
  verifyTopLevelScriptForGeneratedDir,
  verifyWithTypescriptCompiler,
} from '../utils/verify-code'
import json from './fixtures/issue-missing-beet-import.json'
import { sync as rmrf } from 'rimraf'

const outputDir = path.join(__dirname, 'output', 'issue-missing-beet-import')
const generatedSDKDir = path.join(outputDir, 'generated')

test('renders type correct SDK for issue-missing-beet-import', async (t) => {
  rmrf(outputDir)
  const idl = json as Idl
  const gen = new Solita(idl, { formatCode: true })
  await gen.renderAndWriteTo(generatedSDKDir)
  await verifyWithTypescriptCompiler(t, generatedSDKDir)
  await verifySyntacticCorrectnessForGeneratedDir(t, generatedSDKDir)
  await verifyTopLevelScriptForGeneratedDir(t, generatedSDKDir)
})