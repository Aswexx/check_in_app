<template>
  <ul class="w-full menu menu-horizontal p-2
    sm:menu-vertical sm:w-56 sm:menu-normal
  ">
    <li>
      <NuxtLink to="/party-register">
        <IconEdit/>登錄聚會
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/parties">
        <IconRecord/>聚會紀錄
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        首頁
      </NuxtLink>
    </li>
  </ul>
</template>