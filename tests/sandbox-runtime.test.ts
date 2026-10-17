import { describe, expect, it } from 'vitest'
import { buildSrcdoc } from '~/utils/sandbox'
import { SCRIPT_PRIORITY, needsTranspile, transpileScript } from '~/utils/transpile'

describe('transpileScript', () => {
  it('passes plain JavaScript straight through', async () => {
    const source = 'const n = 1\n'
    const result = await transpileScript(source, 'javascript')
    expect(result.error).toBeNull()
    expect(result.code).toBe(source)
  })

  it('erases TypeScript type annotations but keeps the value', async () => {
    const result = await transpileScript('const n: number = 41 + 1\n', 'typescript')
    expect(result.error).toBeNull()
    expect(result.code).toContain('41 + 1')
    expect(result.code).not.toContain(': number')
  })

  it('compiles JSX to React.createElement calls', async () => {
    const result = await transpileScript('const el = <h1 className="title">Hi</h1>\n', 'jsx')
    expect(result.error).toBeNull()
    expect(result.code).toContain('React.createElement')
    expect(result.code).toContain('h1')
  })

  it('handles TSX: both the type erasure and the JSX transform', async () => {
    const result = await transpileScript(
      'const el: JSX.Element = <Card title="Hi" />\n',
      'tsx',
    )
    expect(result.error).toBeNull()
    expect(result.code).toContain('React.createElement')
    expect(result.code).not.toContain('JSX.Element')
  })

  it('reports a compile error instead of throwing', async () => {
    const result = await transpileScript('const = (', 'typescript')
    expect(result.error).not.toBeNull()
    expect(result.code).toBe('')
  })

  it('knows which languages need compiling', () => {
    expect(needsTranspile('javascript')).toBe(false)
    expect(needsTranspile('typescript')).toBe(true)
    expect(needsTranspile('jsx')).toBe(true)
    expect(needsTranspile('tsx')).toBe(true)
    expect(SCRIPT_PRIORITY[0]).toBe('tsx')
  })
})

describe('buildSrcdoc', () => {
  const base = { html: '<p>hi</p>', css: '', javascript: 'console.log(1)' }

  it('runs the learner script after the test harness', () => {
    const doc = buildSrcdoc(base)
    expect(doc).toContain('<script id="learner-js">')
    expect(doc.indexOf('learner-js')).toBeGreaterThan(doc.indexOf('__cases'))
  })

  it('injects the runtime and a mount node for React exercises', () => {
    const doc = buildSrcdoc({
      ...base,
      runtime: 'window.React = {};',
      mount: '<div id="root"></div>',
    })
    expect(doc).toContain('<div id="root"></div>')
    const runtimeAt = doc.indexOf('window.React = {};')
    const learnerAt = doc.indexOf('<script id="learner-js">')
    expect(runtimeAt).toBeGreaterThan(-1)
    expect(runtimeAt).toBeLessThan(learnerAt)
  })

  it('leaves the runtime out entirely when none is passed', () => {
    expect(buildSrcdoc(base)).not.toContain('vendor-runtime')
  })

  it('cannot be broken out of by a literal </script> in the runtime', () => {
    const benign = buildSrcdoc({ ...base, runtime: 'const ok = 1' })
    const malicious = buildSrcdoc({
      ...base,
      runtime: 'const evil = "</script><script>alert(1)</script>"',
    })
    // Same number of real closing tags: the runtime's own wrapper, and no
    // extra ones smuggled in by its contents.
    expect(malicious.match(/<\/script>/g)?.length).toBe(benign.match(/<\/script>/g)?.length)
    expect(malicious).not.toContain('</script><script>alert(1)')
  })
})
