<template>
	<div class="hero">
		<div class="hero-overlay bg-opacity-60"></div>

		<div class="hero-content text-base sm:text-xl text-neutral-content">
			<div class="flex flex-col space-y-20">
				<div class="fade-in flex items-center space-x-5">
					<IconOne/>
					<p>加入 LINE BOT 帳號好友</p>
					<img class="w-[100px]" src="@/assets/images/qrcode.png" loading="lazy">
				</div>
	
				<div class="fade-in-1 flex items-center justify-between">
					<IconTwo/>
					<p class="flex-1 text-center">登錄聚會</p>
				</div>
	
				<div class="fade-in-2 flex items-center justify-between">
					<IconThree/>
					<div class="flex-1 text-center">
						<p>分享 LINE BOT 帳號</p>
						<p class="px-4">參與者到達地點後向 LINE BOT 發送關鍵字: <b class="underline">簽到</b></p>
					</div>
				</div>


				<button class="fade-in-3 w-1/2 btn btn-primary mx-auto"
					@click="navigateTo('/party-register')"
				>開始登錄聚會</button>
			</div>
		</div>
	</div>
</template>

<style>
.hero {
	background-image: url('/assets/images/bg-home.jpg');
}

.fade-in {
	-webkit-animation: fade-in .5s cubic-bezier(0.600, 0.040, 0.980, 0.335);
	animation: fade-in .5s cubic-bezier(0.600, 0.040, 0.980, 0.335);
}

.fade-in-1 {
	-webkit-animation: fade-in 1.2s cubic-bezier(0.600, 0.040, 0.980, 0.335);
	animation: fade-in 1.2s cubic-bezier(0.600, 0.040, 0.980, 0.335);
}

.fade-in-2 {
	-webkit-animation: fade-in 1.7s cubic-bezier(0.600, 0.040, 0.980, 0.335);
	animation: fade-in 1.7s cubic-bezier(0.600, 0.040, 0.980, 0.335);
}

.fade-in-3 {
	-webkit-animation: fade-in 2.2s cubic-bezier(0.600, 0.040, 0.980, 0.335);
	animation: fade-in 2.2s cubic-bezier(0.600, 0.040, 0.980, 0.335);
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
