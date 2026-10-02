<template>
  <div v-if="project" class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <nav class="text-xs text-dim" aria-label="Breadcrumb">
      <NuxtLink to="/projects" class="hover:text-brand">Projects</NuxtLink>
      <span class="px-1.5">/</span>
      <span class="text-muted">{{ project.title }}</span>
    </nav>

    <header class="mt-4 flex flex-wrap items-start justify-between gap-6">
      <div class="max-w-2xl">
        <div class="flex flex-wrap items-center gap-2">
          <TagPill v-for="tech in technologies" :key="tech" :value="tech" tone="info" />
          <TagPill :value="project.difficulty" tone="brand" />
        </div>
        <h1 class="mt-3 text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
          {{ project.title }}
        </h1>
        <p class="mt-2 text-muted">{{ project.summary }}</p>
      </div>
      <dl class="flex gap-6 font-mono text-xs text-dim">
        <div>
          <dt>Time</dt>
          <dd class="mt-1 text-mist-50">~{{ project.estimatedMinutes }} min</dd>
        </div>
        <div>
          <dt>Reward</dt>
          <dd class="mt-1 text-brand">{{ project.xp }} XP</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd class="mt-1" :class="complete ? 'text-ok' : 'text-mist-50'">
            {{ complete ? 'Submitted' : 'In progress' }}
          </dd>
        </div>
      </dl>
    </header>

    <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <div class="min-w-0 space-y-6">
        <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-sm font-semibold text-mist-50">Brief</h2>
          <ul class="mt-2 space-y-2 text-sm text-mist-200">
            <li v-for="(line, index) in project.brief" :key="index" class="flex gap-2">
              <span class="text-brand" aria-hidden="true">▸</span>
              <span v-html="inline(line)" />
            </li>
          </ul>
          <h2 class="mt-5 text-sm font-semibold text-mist-50">Requirements</h2>
          <ul class="mt-2 space-y-2 text-sm text-mist-200">
            <li v-for="(line, index) in project.requirements" :key="index" class="flex gap-2">
              <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand/70" aria-hidden="true" />
              <span v-html="inline(line)" />
            </li>
          </ul>
        </section>

        <section
          v-if="project.assets && project.assets.length"
          class="rounded-2xl border border-ink-600 bg-ink-900 p-5"
        >
          <h2 class="text-sm font-semibold text-mist-50">Images</h2>
          <p class="mt-1 text-xs leading-relaxed text-muted">
            These are the images the design reference uses. Copy the URL rather than typing it:
            a query string like <code class="font-mono">?text=Saturday+Market</code> is exactly where
            typos happen, and a broken image is harder to spot than a broken selector.
          </p>
          <ul class="mt-3 space-y-2">
            <li
              v-for="asset in project.assets"
              :key="asset.id"
              class="rounded-xl border border-ink-600 bg-ink-850 p-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-sm font-medium text-mist-50">{{ asset.label }}</p>
                  <p v-if="asset.alt" class="mt-0.5 text-xs leading-relaxed text-muted">
                    alt: {{ asset.alt }}
                  </p>
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs font-medium transition hover:border-brand/50 hover:bg-ink-800"
                  :class="copiedUrl === asset.url ? 'text-ok' : 'text-mist-50'"
                  :aria-label="`Copy the URL for ${asset.label}`"
                  @click="copyAsset(asset.url)"
                >
                  {{ copiedUrl === asset.url ? 'Copied' : 'Copy' }}
                </button>
              </div>
              <p class="mt-2 break-all font-mono text-[11px] leading-relaxed text-dim">{{ asset.url }}</p>
            </li>
          </ul>
        </section>

        <section>
          <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-sm font-semibold text-mist-50">Design reference</h2>
            <NuxtLink
              :to="`/projects/${project.slug}/design`"
              class="rounded-lg border border-ink-600 px-3 py-1.5 text-xs font-medium text-mist-50 transition hover:border-brand/50 hover:bg-ink-800"
            >
              Open full page
            </NuxtLink>
          </div>
          <NuxtLink
            :to="`/projects/${project.slug}/design`"
            class="group block overflow-hidden rounded-2xl border border-ink-600 transition hover:border-brand/40"
          >
            <div class="h-56 bg-white">
              <iframe
                class="pointer-events-none h-full w-full"
                :title="`${project.title} design reference thumbnail`"
                sandbox=""
                :srcdoc="thumbnailDoc"
              />
            </div>
            <p class="flex items-center justify-between gap-2 border-t border-ink-600 bg-ink-900 px-4 py-2.5 text-xs text-muted">
              <span>The reference is a full page. Open it to check 360px, 720px and 1280px.</span>
              <span class="shrink-0 text-brand transition group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
            </p>
          </NuxtLink>
        </section>

        <section>
          <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-sm font-semibold text-mist-50">Starter files</h2>
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-xs font-medium text-mist-50 transition hover:border-brand/50 hover:bg-ink-800"
              @click="downloadFolder"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Download folder
            </button>
          </div>
          <p class="text-xs text-muted">
            Unpacks a <code class="font-mono text-mist-200">{{ project.slug }}/</code> folder with
            <code class="font-mono text-mist-200">index.html</code>,
            <code class="font-mono text-mist-200">style.css</code>, your
            <code class="font-mono text-mist-200">script.js</code>, a
            <code class="font-mono text-mist-200">README.md</code> and the design reference, so you
            can work in your own editor.
          </p>
        </section>

        <EditorCodeWorkspace
          :files="files"
          :starter-code="project.starterFiles"
          :active-language="firstLanguage"
          @update:files="files = $event"
        />
      </div>

      <aside class="space-y-4 lg:sticky lg:top-20">
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <div class="flex items-center justify-between gap-2">
            <h2 class="text-sm font-semibold text-mist-50">Checklist</h2>
            <span class="font-mono text-xs text-dim">{{ checkedCount }}/{{ project.checklist.length }}</span>
          </div>
          <ul class="mt-3 space-y-2">
            <li v-for="item in project.checklist" :key="item.id">
              <label class="flex cursor-pointer items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  class="mt-1 accent-brand"
                  :checked="isChecked(item.id)"
                  @change="toggle(item.id)"
                />
                <span :class="isChecked(item.id) ? 'text-dim line-through' : 'text-mist-200'">
                  {{ item.label }}
                  <span
                    v-if="item.verify.kind !== 'manual'"
                    class="ml-1 font-mono text-[10px] uppercase text-dim"
                  >{{ item.verify.kind }}</span>
                </span>
              </label>
            </li>
          </ul>
          <ProgressBar class="mt-4" :value="checklistPercent" label="Checklist progress" />
          <button
            type="button"
            class="mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition"
            :class="
              complete
                ? 'border border-ok/40 bg-ok/10 text-ok'
                : readyToSubmit
                  ? 'bg-brand text-ink-950 hover:bg-brand-soft'
                  : 'cursor-not-allowed border border-ink-600 text-dim'
            "
            :disabled="!readyToSubmit"
            @click="submit"
          >
            {{ complete ? 'Project submitted ✓' : readyToSubmit ? 'Submit project' : 'Complete every item first' }}
          </button>
        </div>

        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-sm font-semibold text-mist-50">A strong solution</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ project.solutionNote }}</p>
        </div>
      </aside>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 class="text-2xl font-semibold text-mist-50">Project not found</h1>
    <NuxtLink to="/projects" class="mt-4 inline-block text-sm text-brand">Back to projects</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ChecklistItem, EditorLanguage } from '~/types/content'
import { renderInline } from '~/utils/inline-markdown'
import { designDocument, designThumbnailDocument } from '~/utils/project-design'
import { downloadZip } from '~/utils/zip'

const route = useRoute()
const project = computed(() => getProject(String(route.params.slug)))
const { isProjectComplete, completeProject } = useLearningProgress()

useHead({ title: computed(() => project.value?.title ?? 'Project') })

const files = ref<Partial<Record<EditorLanguage, string>>>({})
const manualChecks = ref<Record<string, boolean>>({})
const copiedUrl = ref('')
let copyReset: ReturnType<typeof setTimeout> | undefined

/** Copy an asset URL and flash a confirmation, since a placeholder URL is easy to mistype. */
async function copyAsset(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    copiedUrl.value = url
  } catch {
    copiedUrl.value = ''
    return
  }
  clearTimeout(copyReset)
  copyReset = setTimeout(() => {
    copiedUrl.value = ''
  }, 1800)
}

onBeforeUnmount(() => clearTimeout(copyReset))

watch(
  project,
  (value) => {
    if (value) files.value = { ...value.starterFiles }
  },
  { immediate: true },
)

const complete = computed(() => (project.value ? isProjectComplete(project.value.id) : false))

const technologies = computed(() =>
  (project.value?.technologies ?? []).map((tech) =>
    tech === 'html' ? 'HTML' : tech === 'css' ? 'CSS' : tech === 'javascript' ? 'JavaScript' : tech,
  ),
)

const firstLanguage = computed<EditorLanguage>(() => {
  const list = project.value?.technologies ?? []
  if (list.includes('javascript')) return 'javascript'
  if (list.includes('css')) return 'css'
  return 'html'
})

const thumbnailDoc = computed(() => (project.value ? designThumbnailDocument(project.value) : ''))

const FILE_NAMES: Record<EditorLanguage, string> = {
  html: 'index.html',
  css: 'style.css',
  javascript: 'script.js',
}

/**
 * Bundle the editor's current files into a folder the learner can unzip. The
 * brief and requirements travel with it so the folder stands on its own.
 */
function downloadFolder() {
  const current = project.value
  if (!current) return

  const folder = current.slug
  const entries = (Object.keys(FILE_NAMES) as EditorLanguage[])
    .filter((language) => files.value[language])
    .map((language) => ({
      path: `${folder}/${FILE_NAMES[language]}`,
      content: files.value[language] as string,
    }))

  entries.push({
    path: `${folder}/reference/design-reference.html`,
    content: designDocument(current),
  })
  entries.push({ path: `${folder}/README.md`, content: readme(current) })

  downloadZip(entries, `${folder}.zip`)
}

function readme(target: NonNullable<typeof project.value>) {
  const lines = [
    `# ${target.title}`,
    '',
    target.summary,
    '',
    '## Files',
    '',
    '- `index.html` - the page structure',
    '- `style.css` - the styles',
    ...(files.value.javascript ? ['- `script.js` - the behaviour'] : []),
    '- `reference/design-reference.html` - open this in a browser to see the target design',
    '',
    '## Brief',
    '',
    ...target.brief.map((line, index) => `${index + 1}. ${renderInline(line)}`),
    '',
    '## Requirements',
    '',
    ...target.requirements.map((line) => `- ${renderInline(line)}`),
    '',
    ...(target.assets?.length
      ? [
          '## Images',
          '',
          ...target.assets.map((asset) => `- ${asset.label}: ${asset.url}`),
          '',
        ]
      : []),
  ]
  return lines.join('\n')
}

function inline(text: string) {
  return renderInline(text)
}

/**
 * Automated items are verified against the learner's own files. This is a local,
 * transparent check: it looks for the structural pieces the brief asked for.
 */
function verifyItem(item: ChecklistItem): boolean {
  if (item.verify.kind === 'manual') return manualChecks.value[item.id] === true
  const source = [
    files.value.html ?? '',
    files.value.css ?? '',
    files.value.javascript ?? '',
  ].join('\n').toLowerCase()
  const needle =
    item.verify.kind === 'selector' ? item.verify.selector : (item.verify as { needle: string }).needle
  return source.includes(needle.toLowerCase())
}

function isChecked(itemId: string) {
  const item = project.value?.checklist.find((entry) => entry.id === itemId)
  if (!item) return false
  return verifyItem(item)
}

function toggle(itemId: string) {
  manualChecks.value = { ...manualChecks.value, [itemId]: !manualChecks.value[itemId] }
}

const checkedCount = computed(
  () => (project.value?.checklist ?? []).filter((item) => isChecked(item.id)).length,
)

const checklistPercent = computed(() => {
  const total = project.value?.checklist.length ?? 0
  return total === 0 ? 0 : Math.round((checkedCount.value / total) * 100)
})

const readyToSubmit = computed(() => checklistPercent.value === 100)

function submit() {
  if (!project.value || !readyToSubmit.value) return
  completeProject(project.value.id, project.value.xp)
}
</script>