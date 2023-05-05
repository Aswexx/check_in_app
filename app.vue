<template>
	<div class="min-h-[100dvh] max-w-[1200px] mx-auto flex flex-col sm:flex-row">
		<NavBar/>
		<NuxtLoadingIndicator color="#661AE6" :height="7"/>
		<NuxtPage class="bg-gray-700 w-full flex-1"/>
		<Toast/>
	</div>
</template>