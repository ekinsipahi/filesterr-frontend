<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950" @click="ctxMenu = null" @contextmenu="ctxMenu = null">
    <main class="max-w-6xl mx-auto px-6 pt-28 pb-12">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-32">
        <svg class="w-8 h-8 animate-spin text-brand-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>

      <template v-else-if="user">

        <!-- Email verification banner -->
        <div v-if="!user.is_email_verified" class="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div class="flex-1">
            <p class="text-sm font-semibold text-amber-800 dark:text-amber-300">{{ t('dashboard.verifyBanner') }}</p>
            <p class="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
              <i18n-t keypath="dashboard.verifyBannerSub" tag="span">
                <template #email><strong>{{ user.email }}</strong></template>
              </i18n-t>
            </p>
          </div>
        </div>

        <!-- Welcome + Upload button -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white">
              {{ t('dashboard.welcomeBack', { name: user.username ? `, ${user.username}` : '' }) }}
            </h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{{ t('dashboard.manageFiles') }}</p>
          </div>
          <div class="flex items-center gap-2">
            <a v-if="isProAnalytics" href="/dashboard/analytics"
              class="btn-ghost text-sm hidden sm:inline-flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              {{ t('dashboard.analyticsBtn') }}
            </a>
            <a href="/upload" class="btn-primary text-sm hidden sm:inline-flex">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t('dashboard.uploadBtn') }}
            </a>
          </div>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <!-- Plan -->
          <div class="card p-5 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="planStyle.bg">
              <svg class="w-5 h-5" :class="planStyle.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-zinc-400 uppercase tracking-wide font-semibold">{{ t('dashboard.planLabel') }}</p>
              <p class="text-lg font-extrabold text-zinc-900 dark:text-white capitalize mt-0.5">
                {{ user.plan === 'promax' ? 'Pro Max' : user.plan }}
              </p>
              <!-- Expiry badge -->
              <p v-if="user.plan_expires_at && !['free','anonymous'].includes(user.plan)"
                class="text-[11px] mt-0.5 font-medium"
                :class="planExpiryDays !== null && planExpiryDays <= 3
                  ? 'text-red-500'
                  : planExpiryDays !== null && planExpiryDays <= 7
                    ? 'text-amber-500'
                    : 'text-zinc-400'">
                {{ planExpiryDays !== null && planExpiryDays <= 0 ? 'Expired' : `Expires ${formatDate(user.plan_expires_at)}` }}
              </p>
              <a v-if="user.plan_expires_at && !['free','anonymous'].includes(user.plan)"
                :href="`/checkout?plan=${user.plan}`"
                class="text-xs text-brand-500 hover:underline mt-0.5 inline-block">Renew →</a>
              <a v-else-if="user.plan !== 'promax'" href="/pricing"
                class="text-xs text-brand-500 hover:underline mt-1 inline-block">{{ t('dashboard.upgradeLink') }}</a>
            </div>
          </div>

          <!-- Storage -->
          <div class="card p-5">
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-xs text-zinc-400 uppercase tracking-wide font-semibold">{{ t('dashboard.storageLabel') }}</p>
                <p class="text-lg font-extrabold text-zinc-900 dark:text-white mt-0.5">
                  {{ formatBytes(stats.total_size) }}
                  <span class="text-zinc-400 font-normal text-sm">/ {{ formatBytes(stats.storage_limit) }}</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
              </div>
            </div>
            <div class="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5">
              <div class="h-1.5 rounded-full transition-all duration-700"
                :class="stats.storage_used_pct > 85 ? 'bg-red-500' : stats.storage_used_pct > 60 ? 'bg-amber-500' : 'bg-brand-500'"
                :style="`width:${Math.min(stats.storage_used_pct, 100)}%`" />
            </div>
            <p class="text-[10px] text-zinc-400 mt-1.5">{{ t('dashboard.storageUsed', { pct: stats.storage_used_pct }) }}</p>
          </div>

          <!-- Downloads -->
          <div class="card p-5 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-zinc-400 uppercase tracking-wide font-semibold">{{ t('dashboard.downloadsLabel') }}</p>
              <p class="text-lg font-extrabold text-zinc-900 dark:text-white mt-0.5">{{ stats.downloads_last_30d.toLocaleString() }}</p>
              <p class="text-xs text-zinc-400 mt-1">{{ t('dashboard.fileCountSuffix', { n: stats.file_count }, stats.file_count) }}</p>
            </div>
          </div>
        </div>

        <!-- Upgrade strip (free/anonymous only) -->
        <div v-if="['free', 'anonymous'].includes(user.plan)" class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{{ t('dashboard.upgradeYourPlan') }}</h2>
            <a href="/pricing" class="text-xs text-brand-500 hover:underline">{{ t('dashboard.compareAllPlans') }}</a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a v-for="p in upgradePlans" :key="p.slug" :href="`/checkout?plan=${p.slug}`"
              class="card-hover p-4 flex items-center gap-3 group cursor-pointer"
              :class="p.slug === 'pro' ? 'ring-1 ring-brand-500/30' : ''">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                :class="p.slug === 'promax' ? 'bg-purple-50 dark:bg-purple-900/20' : p.slug === 'pro' ? 'bg-violet-50 dark:bg-violet-900/20' : 'bg-amber-50 dark:bg-amber-900/20'">
                <svg class="w-5 h-5"
                  :class="p.slug === 'promax' ? 'text-purple-500' : p.slug === 'pro' ? 'text-violet-500' : 'text-amber-500'"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-zinc-900 dark:text-white text-sm capitalize">{{ p.slug === 'promax' ? 'Pro Max' : p.slug }}</p>
                <p class="text-xs text-zinc-400">{{ p.storage }} · ${{ p.price.monthly }}/mo</p>
              </div>
              <svg class="w-4 h-4 text-zinc-300 dark:text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- ── FILES SECTION ── -->
        <div class="card overflow-hidden">

          <!-- Toolbar -->
          <div class="flex items-center gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 class="font-semibold text-zinc-900 dark:text-white text-sm flex-1">{{ t('dashboard.yourFiles') }}</h2>

            <!-- New Folder (premium+) -->
            <button v-if="canUseFolders" @click="newFolderModal = true"
              class="btn-ghost text-xs py-1.5 px-3 inline-flex items-center gap-1.5 shrink-0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              </svg>
              {{ t('dashboard.newFolder') }}
            </button>

            <!-- Search -->
            <div class="relative hidden sm:block">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input v-model="search" type="text" :placeholder="t('dashboard.searchPlaceholder')"
                class="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-brand-500/40 w-44 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"/>
            </div>

            <!-- View toggle -->
            <div class="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5 gap-0.5">
              <button @click="viewMode = 'list'"
                class="p-1.5 rounded-md transition-colors"
                :class="viewMode === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-600'">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              </button>
              <button @click="viewMode = 'grid'"
                class="p-1.5 rounded-md transition-colors"
                :class="viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-600'">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
            </div>

            <!-- Upload button (click to pick file) -->
            <label class="btn-primary text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 shrink-0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Upload
              <input type="file" class="hidden" multiple @change="onFileInputChange" />
            </label>
          </div>

          <!-- Bulk action bar -->
          <Transition name="bulk-bar">
            <div v-if="selectedIds.size > 0"
              class="flex items-center gap-2.5 px-5 py-2.5 bg-brand-50/80 dark:bg-brand-900/20 border-b border-brand-100 dark:border-brand-800/40">
              <svg class="w-3.5 h-3.5 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-xs font-semibold text-brand-700 dark:text-brand-300">{{ selectedIds.size }} selected</span>
              <div class="flex-1" />
              <button v-if="canZipDownload" @click="zipDownload" :disabled="zipDownloading"
                class="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold transition-colors">
                <svg v-if="zipDownloading" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                {{ zipDownloading ? 'Zipping…' : `ZIP (${selectedIds.size})` }}
              </button>
              <button @click="bulkDeleteConfirm = true"
                class="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg bg-red-500 hover:bg-red-400 text-white font-semibold transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete ({{ selectedIds.size }})
              </button>
              <button @click="clearSelection" class="text-xs py-1.5 px-2.5 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-800/30 text-brand-600 dark:text-brand-400 font-medium transition-colors">
                Clear
              </button>
            </div>
          </Transition>

          <!-- Folder breadcrumb -->
          <div v-if="canUseFolders && currentFolderId" class="flex items-center gap-1.5 px-5 py-2.5 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            <button @click="currentFolderId = null"
              @dragover.prevent="dragOverCrumb = 'root'"
              @dragleave="dragOverCrumb = null"
              @drop.prevent="onDropToCrumb(null)"
              class="flex items-center gap-1 px-1.5 py-0.5 rounded-lg transition-colors"
              :class="dragOverCrumb === 'root'
                ? 'text-brand-600 bg-brand-100 dark:bg-brand-900/30 ring-1 ring-brand-400/50'
                : 'text-zinc-400 hover:text-brand-500'">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              {{ t('dashboard.allFiles') }}
            </button>
            <template v-for="crumb in currentFolderPath" :key="crumb.id">
              <svg class="w-3 h-3 text-zinc-300 dark:text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              <button @click="currentFolderId = crumb.id"
                @dragover.prevent="dragOverCrumb = crumb.id"
                @dragleave="dragOverCrumb = null"
                @drop.prevent="onDropToCrumb(crumb.id)"
                class="font-medium px-1.5 py-0.5 rounded-lg transition-colors truncate max-w-[120px]"
                :class="dragOverCrumb === crumb.id
                  ? 'text-brand-600 bg-brand-100 dark:bg-brand-900/30 ring-1 ring-brand-400/50'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-brand-500'">
                {{ crumb.name }}
              </button>
            </template>
          </div>

          <!-- Files loading -->
          <div v-if="filesLoading" class="px-5 py-8 space-y-3">
            <div v-for="n in 4" :key="n" class="flex items-center gap-4 animate-pulse">
              <div class="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0" />
              <div class="flex-1 space-y-1.5">
                <div class="h-3.5 bg-zinc-100 dark:bg-zinc-800 rounded w-2/5" />
                <div class="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-1/4" />
              </div>
              <div class="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-14 hidden sm:block" />
              <div class="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-20 hidden md:block" />
            </div>
          </div>

          <!-- Empty state / drop zone -->
          <div v-else-if="filteredFiles.length === 0 && currentFolders.length === 0"
            class="px-5 py-14 flex flex-col items-center text-center transition-colors"
            :class="isDraggingOverSection ? 'bg-brand-50 dark:bg-brand-900/10' : ''"
            @dragover.prevent="isDraggingOverSection = true"
            @dragleave="isDraggingOverSection = false"
            @drop.prevent="e => { isDraggingOverSection = false; onDropUpload(e) }">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors"
              :class="isDraggingOverSection ? 'bg-brand-100 dark:bg-brand-800/30' : 'bg-zinc-100 dark:bg-zinc-800'">
              <svg class="w-8 h-8 transition-colors"
                :class="isDraggingOverSection ? 'text-brand-500' : 'text-zinc-400'"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="isDraggingOverSection" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="font-bold text-zinc-900 dark:text-white text-base mb-1">
              {{ isDraggingOverSection ? 'Drop to upload' : (search ? t('dashboard.noMatchTitle') : t('dashboard.noFilesTitle')) }}
            </h3>
            <p class="text-xs text-zinc-400 mb-5 max-w-xs">
              {{ isDraggingOverSection ? 'Files will be uploaded to your dashboard' : (search ? t('dashboard.noMatchBody') : t('dashboard.noFilesBody')) }}
            </p>
            <label v-if="!search && !isDraggingOverSection" class="btn-primary text-sm cursor-pointer inline-flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t('dashboard.uploadFirst') }}
              <input type="file" class="hidden" multiple @change="onFileInputChange" />
            </label>
          </div>

          <!-- ── LIST VIEW ── -->
          <template v-else-if="viewMode === 'list'">
            <!-- Header row -->
            <div class="hidden md:grid grid-cols-[32px_2fr_80px_100px_90px_100px] gap-4 px-5 py-2.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
              <div class="flex items-center">
                <input ref="selectAllEl" type="checkbox" :checked="allSelected"
                  @change="toggleAll" class="w-3.5 h-3.5 rounded cursor-pointer accent-brand-500" />
              </div>
              <span>{{ t('dashboard.colName') }}</span>
              <span>{{ t('dashboard.colSize') }}</span>
              <span>{{ t('dashboard.colUploaded') }}</span>
              <span>{{ t('dashboard.colDownloads') }}</span>
              <span class="text-right">{{ t('dashboard.colActions') }}</span>
            </div>

            <!-- Folder rows (list view) -->
            <template v-if="canUseFolders">
              <div v-for="folder in currentFolders" :key="`folder-${folder.id}`"
                class="grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_2fr_80px_100px_90px_100px] gap-4 items-center px-5 py-3.5 transition-all duration-150 border-b border-zinc-100/60 dark:border-zinc-800/60 group cursor-pointer"
                :class="dragOverFolderId === folder.id
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 scale-[1.01]'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'"
                @click="currentFolderId = folder.id"
                @dragover.prevent="dragOverFolderId = folder.id"
                @dragleave="dragOverFolderId = null"
                @drop.prevent="onDropFileInFolder(folder)">
                <div class="hidden md:flex" />
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-zinc-900 dark:text-white truncate">{{ folder.name }}</p>
                    <p class="text-[10px] text-zinc-400 mt-0.5">{{ folder.file_count }} file{{ folder.file_count !== 1 ? 's' : '' }}</p>
                  </div>
                </div>
                <span class="text-xs text-zinc-300 dark:text-zinc-600 hidden md:block">—</span>
                <span class="text-[10px] text-zinc-400 hidden md:block uppercase tracking-wider">{{ t('dashboard.folderLabel') }}</span>
                <span class="hidden md:block"></span>
                <div class="flex items-center gap-1 justify-end" @click.stop>
                  <button @click.stop="startRename(folder)" title="Rename"
                    class="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-600">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click.stop="deleteFolder(folder)" title="Delete folder"
                    class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-zinc-400 hover:text-red-500">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </template>

            <div v-for="file in filteredFiles" :key="file.id"
              class="grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_2fr_80px_100px_90px_100px] gap-4 items-center px-5 py-3.5 transition-all duration-150 border-b border-zinc-100/60 dark:border-zinc-800/60 last:border-0 group"
              :class="[
                draggingFileId === file.id ? 'opacity-50' : '',
                selectedIds.has(file.id)
                  ? 'bg-brand-50/60 dark:bg-brand-900/10'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              ]"
              :draggable="canUseFolders"
              @dragstart="draggingFileId = file.id"
              @dragend="draggingFileId = null"
              @contextmenu.prevent.stop="openContextMenu(file, $event)">

              <!-- Checkbox -->
              <div class="flex items-center" @click.stop>
                <input type="checkbox" :checked="selectedIds.has(file.id)" @change="toggleSelect(file.id)"
                  class="w-3.5 h-3.5 rounded cursor-pointer accent-brand-500 transition-opacity"
                  :class="selectedIds.has(file.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'" />
              </div>

              <!-- Name + icon -->
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-[10px] font-bold"
                  :style="`background: ${fileColor(file.mime_type)}`">
                  {{ fileExt(file.original_name) }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-zinc-900 dark:text-white truncate max-w-[200px]">{{ file.original_name }}</p>
                  <p class="text-[10px] text-zinc-400 mt-0.5">{{ file.mime_type || 'file' }}</p>
                </div>
              </div>

              <!-- Size -->
              <span class="text-xs text-zinc-500 hidden md:block">{{ file.size_display }}</span>

              <!-- Date + retention -->
              <div class="hidden md:block">
                <span class="text-xs text-zinc-500">{{ formatDate(file.created_at) }}</span>
                <span v-if="retentionBadge(file)" class="block text-[10px] font-semibold mt-0.5"
                  :class="retentionBadge(file).cls">
                  {{ retentionBadge(file).text }}
                </span>
              </div>

              <!-- Downloads -->
              <span class="text-xs text-zinc-500 hidden md:flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                {{ file.download_count.toLocaleString() }}
              </span>

              <!-- Actions -->
              <div class="flex items-center gap-1 justify-end">
                <!-- Copy link -->
                <button @click="copyLink(file)"
                  :title="copiedId === file.id ? t('dashboard.copied') : t('dashboard.copyLink')"
                  class="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  :class="copiedId === file.id ? 'text-brand-500' : 'text-zinc-400 hover:text-zinc-600'">
                  <svg v-if="copiedId !== file.id" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>

                <!-- Open link -->
                <a :href="`/f/${file.share_token}`" target="_blank"
                  :title="t('dashboard.openPage')"
                  class="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-600">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>

                <!-- Move to folder -->
                <button v-if="canUseFolders" @click="moveTarget = file" title="Move to folder"
                  class="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-600">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                  </svg>
                </button>

                <!-- Delete -->
                <button @click.stop="confirmDelete(file)"
                  title="Delete file"
                  class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-zinc-400 hover:text-red-500">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </template>

          <!-- ── GRID VIEW ── -->
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-5">

            <!-- Folder items (grid) -->
            <template v-if="canUseFolders">
              <div v-for="folder in currentFolders" :key="`folder-g-${folder.id}`"
                class="group relative rounded-xl border transition-all overflow-hidden cursor-pointer"
                :class="dragOverFolderId === folder.id
                  ? 'border-amber-400 dark:border-amber-500 bg-amber-100 dark:bg-amber-900/30 scale-[1.03] shadow-lg'
                  : 'border-amber-200 dark:border-amber-800/40 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md bg-amber-50/50 dark:bg-amber-900/10'"
                @click="currentFolderId = folder.id"
                @dragover.prevent="dragOverFolderId = folder.id"
                @dragleave="dragOverFolderId = null"
                @drop.prevent="onDropFileInFolder(folder)">
                <div class="h-24 flex items-center justify-center text-amber-400 dark:text-amber-500">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                  </svg>
                </div>
                <div class="p-3">
                  <p class="text-xs font-semibold text-zinc-900 dark:text-white truncate mb-0.5">{{ folder.name }}</p>
                  <p class="text-[10px] text-zinc-400">{{ folder.file_count }} file{{ folder.file_count !== 1 ? 's' : '' }}</p>
                </div>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" @click.stop>
                  <button @click.stop="startRename(folder)" class="p-2 rounded-xl bg-white/90 hover:bg-white text-zinc-700 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click.stop="deleteFolder(folder)" class="p-2 rounded-xl bg-white/90 hover:bg-red-50 text-red-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </template>

            <div v-for="file in filteredFiles" :key="file.id"
              class="group relative rounded-xl border transition-all overflow-hidden cursor-pointer bg-white dark:bg-zinc-900"
              :class="[
                draggingFileId === file.id ? 'opacity-50 scale-95' : '',
                selectedIds.has(file.id)
                  ? 'border-brand-500 ring-2 ring-brand-500/30 shadow-md'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-brand-400/50 dark:hover:border-brand-500/40 hover:shadow-md'
              ]"
              :draggable="canUseFolders"
              @dragstart="draggingFileId = file.id"
              @dragend="draggingFileId = null"
              @contextmenu.prevent.stop="openContextMenu(file, $event)">

              <!-- Checkbox overlay (top-left) -->
              <div class="absolute top-2 left-2 z-10" @click.stop>
                <input type="checkbox" :checked="selectedIds.has(file.id)" @change="toggleSelect(file.id)"
                  class="w-4 h-4 rounded cursor-pointer accent-brand-500 drop-shadow transition-opacity"
                  :class="selectedIds.has(file.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'" />
              </div>

              <!-- File type block -->
              <div class="h-24 flex items-center justify-center text-white font-bold text-xl"
                :style="`background: linear-gradient(135deg, ${fileColor(file.mime_type)}dd, ${fileColor(file.mime_type)}88)`">
                {{ fileExt(file.original_name) }}
              </div>

              <!-- Info -->
              <div class="p-3">
                <p class="text-xs font-semibold text-zinc-900 dark:text-white truncate mb-0.5">{{ file.original_name }}</p>
                <div class="flex items-center justify-between gap-1">
                  <p class="text-[10px] text-zinc-400">{{ file.size_display }}</p>
                  <span v-if="retentionBadge(file)" class="text-[10px] font-semibold" :class="retentionBadge(file).cls">
                    {{ retentionBadge(file).text }}
                  </span>
                </div>
              </div>

              <!-- Hover actions overlay -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button @click.stop="copyLink(file)"
                  class="p-2 rounded-xl bg-white/90 hover:bg-white text-zinc-700 transition-colors"
                  :title="copiedId === file.id ? t('dashboard.copied') : t('dashboard.copyLink')">
                  <svg v-if="copiedId !== file.id" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                  <svg v-else class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
                <a :href="`/f/${file.share_token}`" target="_blank" @click.stop
                  class="p-2 rounded-xl bg-white/90 hover:bg-white text-zinc-700 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
                <button @click.stop="confirmDelete(file)"
                  class="p-2 rounded-xl bg-white/90 hover:bg-red-50 text-red-500 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Footer: file count + selection info -->
          <div v-if="filteredFiles.length > 0" class="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span class="text-xs text-zinc-400">
              <template v-if="selectedIds.size > 0">
                <span class="text-brand-600 dark:text-brand-400 font-semibold">{{ selectedIds.size }}</span>
                / {{ filteredFiles.length }} selected
              </template>
              <template v-else>{{ filteredFiles.length }} file{{ filteredFiles.length !== 1 ? 's' : '' }}</template>
            </span>
            <span class="text-xs text-zinc-400">{{ formatBytes(stats.total_size) }} used</span>
          </div>
        </div>

      </template>

      <!-- Not authenticated -->
      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-white mb-3">{{ t('dashboard.pleaseSignIn') }}</h2>
        <p class="text-sm text-zinc-400 mb-6">{{ t('dashboard.pleaseSignInSub') }}</p>
        <a href="/login" class="btn-primary text-sm">{{ t('dashboard.signInBtn') }}</a>
      </div>

    </main>

    <!-- New Folder modal -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="newFolderModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="newFolderModal = false" />
          <div class="relative card p-6 w-full max-w-sm shadow-2xl">
            <h3 class="font-display font-bold text-zinc-900 dark:text-white text-lg mb-4">{{ t('dashboard.modalNewFolder') }}</h3>
            <input v-model="newFolderName" type="text" :placeholder="t('dashboard.modalFolderPlaceholder')"
              @keydown.enter="createFolder" @keydown.esc="newFolderModal = false"
              autofocus
              class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 mb-4"/>
            <div class="flex gap-3">
              <button @click="newFolderModal = false" class="flex-1 btn-ghost py-2.5 text-sm justify-center">{{ t('dashboard.modalCancel') }}</button>
              <button @click="createFolder" :disabled="!newFolderName.trim() || newFolderSaving"
                class="flex-1 btn-primary py-2.5 text-sm justify-center">
                <svg v-if="newFolderSaving" class="w-4 h-4 animate-spin mr-1" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ t('dashboard.modalCreate') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Rename Folder modal -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="renamingFolder" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="renamingFolder = null" />
          <div class="relative card p-6 w-full max-w-sm shadow-2xl">
            <h3 class="font-display font-bold text-zinc-900 dark:text-white text-lg mb-4">{{ t('dashboard.modalRenameFolder') }}</h3>
            <input v-model="renameFolderName" type="text"
              @keydown.enter="doRenameFolder" @keydown.esc="renamingFolder = null"
              autofocus
              class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 mb-4"/>
            <div class="flex gap-3">
              <button @click="renamingFolder = null" class="flex-1 btn-ghost py-2.5 text-sm justify-center">{{ t('dashboard.modalCancel') }}</button>
              <button @click="doRenameFolder" :disabled="!renameFolderName.trim() || renameSaving"
                class="flex-1 btn-primary py-2.5 text-sm justify-center">
                <svg v-if="renameSaving" class="w-4 h-4 animate-spin mr-1" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ t('dashboard.modalRename') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Move to Folder modal -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="moveTarget" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="moveTarget = null" />
          <div class="relative card p-6 w-full max-w-sm shadow-2xl">
            <h3 class="font-display font-bold text-zinc-900 dark:text-white text-lg mb-1">{{ t('dashboard.modalMoveFolder') }}</h3>
            <p class="text-xs text-zinc-400 mb-4 truncate">{{ moveTarget?.original_name }}</p>
            <div class="space-y-1 max-h-64 overflow-y-auto mb-4">
              <button @click="moveFileToFolder(moveTarget, null)"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm transition-colors text-left"
                :class="!moveTarget?.folder ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600' : 'text-zinc-700 dark:text-zinc-300'">
                <svg class="w-4 h-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                {{ t('dashboard.modalRootFolder') }}
              </button>
              <button v-for="f in folders" :key="f.id" @click="moveFileToFolder(moveTarget, f.id)"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm transition-colors text-left"
                :class="moveTarget?.folder === f.id ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600' : 'text-zinc-700 dark:text-zinc-300'">
                <svg class="w-4 h-4 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                </svg>
                {{ f.name }}
              </button>
            </div>
            <button @click="moveTarget = null" class="w-full btn-ghost py-2.5 text-sm justify-center">{{ t('dashboard.modalCancel') }}</button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Password modal -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="pwModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="pwModal = null" />
          <div class="relative card p-6 w-full max-w-sm shadow-2xl" @click.stop>
            <div class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-center text-zinc-900 dark:text-white text-lg mb-1">
              {{ pwModal.is_password_protected ? 'Change Password' : 'Set Password' }}
            </h3>
            <p class="text-xs text-zinc-400 text-center mb-5 truncate px-2">{{ pwModal.original_name }}</p>
            <input v-model="pwInput" type="password" placeholder="New password…"
              @keydown.enter="savePw" @keydown.esc="pwModal = null"
              autofocus
              class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 mb-4"/>
            <div class="flex gap-2">
              <button v-if="pwModal.is_password_protected" @click="savePw(true)" :disabled="pwSaving"
                class="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors">
                Remove
              </button>
              <button @click="pwModal = null" class="flex-1 btn-ghost py-2.5 text-sm justify-center">Cancel</button>
              <button @click="savePw(false)" :disabled="!pwInput.trim() || pwSaving"
                class="flex-1 btn-primary py-2.5 text-sm justify-center">
                <svg v-if="pwSaving" class="w-4 h-4 animate-spin mr-1" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Dashboard upload progress toast -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="dashUploadState.active"
          class="fixed bottom-6 right-6 z-[90] card p-4 shadow-2xl w-72 border border-brand-200 dark:border-brand-800">
          <div class="flex items-center gap-3 mb-2">
            <svg class="w-4 h-4 text-brand-500 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span class="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              Uploading {{ dashUploadState.name }}
            </span>
          </div>
          <div class="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5">
            <div class="h-1.5 rounded-full bg-brand-500 transition-all duration-200"
              :style="`width:${dashUploadState.progress}%`" />
          </div>
          <p class="text-[10px] text-zinc-400 mt-1.5">{{ dashUploadState.current }} / {{ dashUploadState.total }} file{{ dashUploadState.total > 1 ? 's' : '' }}</p>
        </div>
      </Transition>
    </Teleport>

    <!-- Full-page drop overlay -->
    <Teleport v-if="isMounted" to="body">
      <div v-if="isDraggingOverPage"
        class="fixed inset-0 z-[95] pointer-events-none">
        <div class="absolute inset-4 rounded-2xl border-2 border-dashed border-brand-500/60 bg-brand-500/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto"
          @dragover.prevent
          @dragleave.self="isDraggingOverPage = false"
          @drop.prevent="e => { isDraggingOverPage = false; onDropUpload(e) }">
          <div class="bg-white dark:bg-zinc-900 rounded-2xl px-10 py-8 text-center shadow-2xl border border-brand-200 dark:border-brand-700">
            <div class="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <p class="font-display font-extrabold text-xl text-zinc-900 dark:text-white mb-1">Drop to upload</p>
            <p class="text-sm text-zinc-400">Files will be added to your dashboard</p>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Bulk delete confirm modal -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="bulkDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="bulkDeleteConfirm = false" />
          <div class="relative card p-6 w-full max-w-sm shadow-2xl" @click.stop>
            <div class="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-center text-zinc-900 dark:text-white text-lg mb-1">Delete {{ selectedIds.size }} Files?</h3>
            <p class="text-xs text-zinc-400 text-center mb-6">This cannot be undone. All selected files and their download links will stop working.</p>
            <div class="flex gap-3">
              <button @click="bulkDeleteConfirm = false" class="flex-1 btn-ghost py-2.5 text-sm justify-center">Cancel</button>
              <button @click="doBulkDelete" :disabled="bulkDeleting"
                class="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-60 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2">
                <svg v-if="bulkDeleting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Delete All
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete confirm modal — isMounted guard prevents SSR hydration mismatch -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade">
        <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="deleteTarget = null" />
          <div class="relative card p-6 w-full max-w-sm shadow-2xl">
            <div class="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-center text-zinc-900 dark:text-white text-lg mb-1">{{ t('dashboard.modalDeleteTitle') }}</h3>
            <p class="text-xs text-zinc-500 text-center mb-1 truncate px-2">{{ deleteTarget?.original_name }}</p>
            <p class="text-xs text-zinc-400 text-center mb-6">{{ t('dashboard.modalDeleteBody') }}</p>
            <div class="flex gap-3">
              <button @click="deleteTarget = null" class="flex-1 btn-ghost py-2.5 text-sm justify-center">{{ t('dashboard.modalCancel') }}</button>
              <button @click="doDelete" :disabled="deleting"
                class="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-60 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2">
                <svg v-if="deleting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ t('dashboard.modalDelete') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Context menu -->
    <FileContextMenu
      v-if="ctxMenu"
      :file="ctxMenu.file"
      :x="ctxMenu.x"
      :y="ctxMenu.y"
      :is-selected="selectedIds.has(ctxMenu.file.id)"
      :can-use-folders="canUseFolders"
      :can-set-password="canUseFolders"
      @close="ctxMenu = null"
      @copy-link="f => copyLink(f)"
      @move="f => { moveTarget = f }"
      @set-password="f => openPwModal(f)"
      @toggle-select="f => toggleSelect(f.id)"
      @delete="f => confirmDelete(f)"
    />

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { getMe } from '../api/index.js'
import { PLANS } from '../data/plans.js'
import { useI18n } from 'vue-i18n'
import FileContextMenu from '../components/dashboard/FileContextMenu.vue'

const { t } = useI18n()

const isMounted    = ref(false)
const user         = ref(null)
const loading      = ref(true)
const filesLoading = ref(true)
const files        = ref([])
const folders      = ref([])
const currentFolderId = ref(null)
const search       = ref('')
const viewMode     = ref('list')
const copiedId     = ref(null)
const deleteTarget = ref(null)
const deleting     = ref(false)
const stats        = ref({ total_size: 0, storage_limit: 0, storage_used_pct: 0, file_count: 0, downloads_last_30d: 0 })

// Folder modal state
const newFolderModal   = ref(false)
const newFolderName    = ref('')
const newFolderSaving  = ref(false)
const renamingFolder   = ref(null)
const renameFolderName = ref('')
const renameSaving     = ref(false)
const moveTarget       = ref(null)

// Drag-and-drop state
const draggingFileId   = ref(null)
const dragOverFolderId = ref(null)
const dragOverCrumb    = ref(null)

// Multi-select
const selectedIds      = ref(new Set())

// Zip download
const zipDownloading   = ref(false)

// Bulk delete
const bulkDeleteConfirm = ref(false)
const bulkDeleting      = ref(false)

// Password modal
const pwModal = ref(null)
const pwInput = ref('')
const pwSaving = ref(false)

// Context menu
const ctxMenu = ref(null)
const selectAllEl = ref(null)

// Drag-and-drop upload from desktop
const isDraggingOverPage    = ref(false)
const isDraggingOverSection = ref(false)
const dashUploadState = ref({ active: false, name: '', progress: 0, current: 0, total: 0 })

const upgradePlans   = PLANS.filter(p => ['premium', 'pro', 'promax'].includes(p.slug))
const canUseFolders  = computed(() => !!user.value && user.value.plan !== 'anonymous')
const isProAnalytics = computed(() => ['pro', 'promax'].includes(user.value?.plan))

const currentFolderPath = computed(() => {
  if (!currentFolderId.value) return []
  const path = []
  let fid = currentFolderId.value
  const seen = new Set()
  while (fid && !seen.has(fid)) {
    seen.add(fid)
    const f = folders.value.find(x => x.id === fid)
    if (!f) break
    path.unshift(f)
    fid = f.parent ?? null
  }
  return path
})

const currentFolders = computed(() => {
  if (!canUseFolders.value) return []
  return folders.value.filter(f =>
    currentFolderId.value === null
      ? !f.parent
      : f.parent === currentFolderId.value
  )
})

const filteredFiles = computed(() => {
  let list = files.value
  if (canUseFolders.value) {
    if (currentFolderId.value === null) {
      list = list.filter(f => !f.folder)
    } else {
      list = list.filter(f => f.folder === currentFolderId.value)
    }
  }
  if (!search.value.trim()) return list
  const q = search.value.toLowerCase()
  return list.filter(f => f.original_name.toLowerCase().includes(q))
})

const canZipDownload  = computed(() => ['pro', 'promax'].includes(user.value?.plan))

const planExpiryDays = computed(() => {
  if (!user.value?.plan_expires_at) return null
  const ms = new Date(user.value.plan_expires_at).getTime() - Date.now()
  return Math.ceil(ms / 86400000)
})

const allSelected = computed(() =>
  filteredFiles.value.length > 0 &&
  filteredFiles.value.every(f => selectedIds.value.has(f.id))
)
const someSelected = computed(() =>
  filteredFiles.value.some(f => selectedIds.value.has(f.id)) && !allSelected.value
)

watch(someSelected, (v) => {
  if (selectAllEl.value) selectAllEl.value.indeterminate = v
})

const planStyle = computed(() => {
  const plan = user.value?.plan
  if (plan === 'promax')  return { bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-500' }
  if (plan === 'pro')     return { bg: 'bg-violet-50 dark:bg-violet-900/20', color: 'text-violet-500' }
  if (plan === 'premium') return { bg: 'bg-amber-50 dark:bg-amber-900/20',   color: 'text-amber-500' }
  return { bg: 'bg-brand-50 dark:bg-brand-900/20', color: 'text-brand-500' }
})

// ── File helpers ───────────────────────────────────────────────────────────

const MIME_COLORS = {
  image:       '#6366f1',
  video:       '#ec4899',
  audio:       '#f59e0b',
  pdf:         '#ef4444',
  zip:         '#f97316',
  doc:         '#3b82f6',
  sheet:       '#22c55e',
  text:        '#6b7280',
  code:        '#8b5cf6',
  default:     '#64748b',
}

function fileColor(mime) {
  if (!mime) return MIME_COLORS.default
  if (mime.startsWith('image/'))        return MIME_COLORS.image
  if (mime.startsWith('video/'))        return MIME_COLORS.video
  if (mime.startsWith('audio/'))        return MIME_COLORS.audio
  if (mime === 'application/pdf')       return MIME_COLORS.pdf
  if (mime.includes('zip') || mime.includes('tar') || mime.includes('rar') || mime.includes('7z')) return MIME_COLORS.zip
  if (mime.includes('word') || mime.includes('document')) return MIME_COLORS.doc
  if (mime.includes('sheet') || mime.includes('excel'))   return MIME_COLORS.sheet
  if (mime.startsWith('text/'))         return MIME_COLORS.text
  if (mime.includes('javascript') || mime.includes('json') || mime.includes('xml')) return MIME_COLORS.code
  return MIME_COLORS.default
}

function fileExt(name) {
  if (!name) return '?'
  const ext = name.split('.').pop()
  return (ext?.length <= 5 ? ext : ext?.slice(0, 4))?.toUpperCase() || '?'
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function retentionBadge(file) {
  if (!file.delete_at) return null
  const msLeft = new Date(file.delete_at).getTime() - Date.now()
  if (msLeft <= 0) return { text: 'Expired', cls: 'text-red-500' }
  const hoursLeft = Math.ceil(msLeft / 3600000)
  const daysLeft  = Math.ceil(msLeft / 86400000)
  const text = daysLeft <= 1 ? `${hoursLeft}h left` : `${daysLeft}d left`
  const cls  = daysLeft <= 1 ? 'text-red-500' : daysLeft <= 3 ? 'text-amber-500' : 'text-zinc-400'
  return { text, cls }
}

function formatBytes(bytes) {
  if (!bytes) return '0 B'
  if (bytes >= 1099511627776) return `${(bytes / 1099511627776).toFixed(1)} TB`
  if (bytes >= 1073741824)    return `${(bytes / 1073741824).toFixed(2)} GB`
  if (bytes >= 1048576)       return `${(bytes / 1048576).toFixed(1)} MB`
  return `${Math.round(bytes / 1024)} KB`
}

// ── Actions ────────────────────────────────────────────────────────────────

function copyLink(file) {
  const url = `${window.location.origin}/f/${file.share_token}`
  navigator.clipboard.writeText(url).then(() => {
    copiedId.value = file.id
    setTimeout(() => { copiedId.value = null }, 2000)
  })
}

function confirmDelete(file) {
  deleteTarget.value = file
}

async function doDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const res = await fetch(`/api/v1/files/delete/${deleteTarget.value.share_token}/`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (res.ok || res.status === 204) {
      const deleted = deleteTarget.value
      deleteTarget.value = null
      files.value = files.value.filter(f => f.id !== deleted.id)
      stats.value.file_count = Math.max(0, stats.value.file_count - 1)
      stats.value.total_size = Math.max(0, stats.value.total_size - (deleted.size || 0))
      stats.value.storage_used_pct = stats.value.storage_limit
        ? Math.round(stats.value.total_size / stats.value.storage_limit * 100 * 10) / 10
        : 0
    } else {
      deleteTarget.value = null
    }
  } catch {
    deleteTarget.value = null
  } finally {
    deleting.value = false
  }
}

// ── Folder actions ─────────────────────────────────────────────────────────

function startRename(folder) {
  renamingFolder.value = folder
  renameFolderName.value = folder.name
}

async function createFolder() {
  if (!newFolderName.value.trim()) return
  newFolderSaving.value = true
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const res = await fetch('/api/v1/files/folders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: newFolderName.value.trim(), parent: currentFolderId.value }),
    })
    if (res.ok) {
      const folder = await res.json()
      folders.value.push(folder)
      newFolderModal.value = false
      newFolderName.value = ''
    }
  } finally {
    newFolderSaving.value = false
  }
}

async function doRenameFolder() {
  if (!renamingFolder.value || !renameFolderName.value.trim()) return
  renameSaving.value = true
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const res = await fetch(`/api/v1/files/folders/${renamingFolder.value.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: renameFolderName.value.trim() }),
    })
    if (res.ok) {
      const idx = folders.value.findIndex(f => f.id === renamingFolder.value.id)
      if (idx !== -1) folders.value[idx] = { ...folders.value[idx], name: renameFolderName.value.trim() }
      renamingFolder.value = null
    }
  } finally {
    renameSaving.value = false
  }
}

async function deleteFolder(folder) {
  const token = localStorage.getItem('access_token') ?? ''
  const res = await fetch(`/api/v1/files/folders/${folder.id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.ok || res.status === 204) {
    folders.value = folders.value.filter(f => f.id !== folder.id)
    if (currentFolderId.value === folder.id) currentFolderId.value = folder.parent ?? null
  }
}

async function moveFileToFolder(file, folderId) {
  const token = localStorage.getItem('access_token') ?? ''
  const res = await fetch(`/api/v1/files/${file.id}/move/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ folder_id: folderId }),
  })
  if (res.ok) {
    const idx = files.value.findIndex(f => f.id === file.id)
    if (idx !== -1) {
      const oldFolderId = files.value[idx].folder
      files.value[idx] = { ...files.value[idx], folder: folderId }
      // Update folder file_counts locally
      if (oldFolderId) {
        const fi = folders.value.findIndex(f => f.id === oldFolderId)
        if (fi !== -1) folders.value[fi] = { ...folders.value[fi], file_count: Math.max(0, folders.value[fi].file_count - 1) }
      }
      if (folderId) {
        const fi = folders.value.findIndex(f => f.id === folderId)
        if (fi !== -1) folders.value[fi] = { ...folders.value[fi], file_count: folders.value[fi].file_count + 1 }
      }
    }
  }
  moveTarget.value = null
}

function onDropFileInFolder(folder) {
  dragOverFolderId.value = null
  const fileId = draggingFileId.value
  draggingFileId.value = null
  if (!fileId) return
  const file = files.value.find(f => f.id === fileId)
  if (file && file.folder !== folder.id) moveFileToFolder(file, folder.id)
}

function onDropToCrumb(folderId) {
  dragOverCrumb.value = null
  const fileId = draggingFileId.value
  draggingFileId.value = null
  if (!fileId) return
  const file = files.value.find(f => f.id === fileId)
  if (file && file.folder !== folderId) moveFileToFolder(file, folderId)
}

// ── Multi-select ───────────────────────────────────────────────────────────

function toggleSelect(id) {
  const s = new Set(selectedIds.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  selectedIds.value = s
}

function clearSelection() {
  selectedIds.value = new Set()
}

function toggleAll() {
  if (allSelected.value) {
    clearSelection()
  } else {
    selectedIds.value = new Set(filteredFiles.value.map(f => f.id))
  }
}

// ── Zip download ───────────────────────────────────────────────────────────

async function zipDownload() {
  if (selectedIds.value.size === 0) return
  zipDownloading.value = true
  try {
    const selected = files.value.filter(f => selectedIds.value.has(f.id))
    const tokens = selected.map(f => f.share_token)
    const token = localStorage.getItem('access_token') ?? ''
    const res = await fetch('/api/v1/files/zip/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tokens }),
    })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'filesterr-batch.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    clearSelection()
  } finally {
    zipDownloading.value = false
  }
}

// ── Bulk delete ────────────────────────────────────────────────────────────

async function doBulkDelete() {
  if (selectedIds.value.size === 0) return
  bulkDeleting.value = true
  try {
    const toDelete = files.value.filter(f => selectedIds.value.has(f.id))
    const token = localStorage.getItem('access_token') ?? ''
    for (const file of toDelete) {
      await fetch(`/api/v1/files/delete/${file.share_token}/`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      files.value = files.value.filter(f => f.id !== file.id)
      stats.value.file_count = Math.max(0, stats.value.file_count - 1)
      stats.value.total_size = Math.max(0, stats.value.total_size - (file.size || 0))
    }
    stats.value.storage_used_pct = stats.value.storage_limit
      ? Math.round(stats.value.total_size / stats.value.storage_limit * 100 * 10) / 10
      : 0
    clearSelection()
    bulkDeleteConfirm.value = false
  } finally {
    bulkDeleting.value = false
  }
}

// ── Password modal ─────────────────────────────────────────────────────────

function openPwModal(file) {
  pwModal.value = file
  pwInput.value = ''
}

async function savePw(remove = false) {
  if (!pwModal.value) return
  pwSaving.value = true
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const res = await fetch(`/api/v1/files/${pwModal.value.id}/settings/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ password: remove ? null : pwInput.value }),
    })
    if (res.ok) {
      const updated = await res.json()
      const idx = files.value.findIndex(f => f.id === updated.id)
      if (idx !== -1) files.value[idx] = updated
      pwModal.value = null
    }
  } finally {
    pwSaving.value = false
  }
}

// ── Context menu ───────────────────────────────────────────────────────────

function openContextMenu(file, event) {
  ctxMenu.value = { file, x: event.clientX, y: event.clientY }
}

// ── Dashboard upload (DnD + file input) ───────────────────────────────────

async function uploadFiles(fileList) {
  if (!fileList?.length) return
  const token = localStorage.getItem('access_token') ?? ''
  const files_arr = [...fileList]

  dashUploadState.value = { active: true, name: files_arr[0].name, progress: 0, current: 0, total: files_arr.length }

  for (let i = 0; i < files_arr.length; i++) {
    const file = files_arr[i]
    dashUploadState.value.current = i + 1
    dashUploadState.value.name    = file.name
    dashUploadState.value.progress = 0

    const fd = new FormData()
    fd.append('file', file)

    await new Promise((resolve) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/v1/files/upload/')
      if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) dashUploadState.value.progress = Math.round(e.loaded / e.total * 100)
      }
      xhr.onload  = resolve
      xhr.onerror = resolve
      xhr.send(fd)
    })
  }

  dashUploadState.value.active = false
  await loadFiles()
}

async function onDropUpload(e) {
  isDraggingOverPage.value    = false
  isDraggingOverSection.value = false
  const dropped = e.dataTransfer?.files
  if (dropped?.length) await uploadFiles(dropped)
}

function onFileInputChange(e) {
  const picked = e.target.files
  if (picked?.length) uploadFiles(picked)
  e.target.value = ''
}

// Window-level drag tracking (only for files from OS, not internal DnD)
let _dragLeaveTimer = null
function _onWindowDragEnter(e) {
  if (e.dataTransfer?.types?.includes('Files')) {
    clearTimeout(_dragLeaveTimer)
    isDraggingOverPage.value = true
  }
}
function _onWindowDragLeave(e) {
  // dragleave fires on every child — only hide when truly leaving the viewport
  if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
    isDraggingOverPage.value = false
  }
}
function _onWindowDragOver(e) {
  if (e.dataTransfer?.types?.includes('Files')) e.preventDefault()
}
function _onWindowDrop(e) {
  // Prevent browser navigation if drop lands outside overlay
  if (!e.defaultPrevented) e.preventDefault()
  isDraggingOverPage.value = false
}

// ── Data loading ───────────────────────────────────────────────────────────

async function loadFiles() {
  filesLoading.value = true
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const userPlan = user.value?.plan
    const hasFolders = ['premium', 'pro', 'promax'].includes(userPlan)

    const fetches = [
      fetch('/api/v1/files/', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/v1/analytics/overview/', { headers: { Authorization: `Bearer ${token}` } }),
      ...(hasFolders ? [fetch('/api/v1/files/folders/', { headers: { Authorization: `Bearer ${token}` } })] : []),
    ]
    const [filesRes, statsRes, foldersRes] = await Promise.all(fetches)
    if (filesRes.ok) {
      const data = await filesRes.json()
      files.value = data.results ?? []
    }
    if (statsRes.ok) {
      const s = await statsRes.json()
      stats.value = { ...stats.value, ...s }
    }
    if (foldersRes?.ok) {
      const fdata = await foldersRes.json()
      folders.value = fdata.results ?? fdata ?? []
    }
  } finally {
    filesLoading.value = false
  }
}

onMounted(async () => {
  isMounted.value = true
  window.addEventListener('dragenter', _onWindowDragEnter)
  window.addEventListener('dragleave', _onWindowDragLeave)
  window.addEventListener('dragover',  _onWindowDragOver)
  window.addEventListener('drop',      _onWindowDrop)
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) { loading.value = false; filesLoading.value = false; return }
  user.value = await getMe()
  loading.value = false
  if (user.value) await loadFiles()
  else filesLoading.value = false
})

onUnmounted(() => {
  window.removeEventListener('dragenter', _onWindowDragEnter)
  window.removeEventListener('dragleave', _onWindowDragLeave)
  window.removeEventListener('dragover',  _onWindowDragOver)
  window.removeEventListener('drop',      _onWindowDrop)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }

.bulk-bar-enter-active { transition: max-height 0.18s ease, opacity 0.15s ease }
.bulk-bar-leave-active { transition: max-height 0.14s ease, opacity 0.12s ease }
.bulk-bar-enter-from, .bulk-bar-leave-to { max-height: 0; opacity: 0; overflow: hidden }
.bulk-bar-enter-to, .bulk-bar-leave-from { max-height: 60px; opacity: 1 }
</style>
