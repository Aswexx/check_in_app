<script setup lang="ts">
const { expectedAttenders, actualAttenders, partyDate } = defineProps<{
	expectedAttenders: string[] | [],
	actualAttenders: Attender[] | [],
	partyDate: Date | string
}>()

const showExpected = ref(true)

const attenders = computed(() => {
	const actualMap = new Map<string, Attender>()
	actualAttenders.forEach((actual) => {
		actualMap.set(actual.lineName, actual) // e.g. { 'Allen': { ... } }
	})

	const expectSet = new Set<string>()
	expectedAttenders.forEach(expect => {
		expectSet.add(expect)
	})
	

	if (showExpected.value) {
		const expectedResult = expectedAttenders.map(name => {
			return {
				lineUserId: actualMap.get(name)?.lineUserId,
				lineName: name,
				avatarUrl: actualMap.get(name)?.avatarUrl,
				checkAt: actualMap.get(name)?.checkAt
			}
		})

		expectedResult.sort((a, b) => Number(new Date(a.checkAt as string)) - Number(new Date(b.checkAt as string)))

		return expectedResult.map(attender => {
			return {
				...attender,
				checkAt: useFormatDate(attender.checkAt!)
			}
		})
	}

	return actualAttenders
		.filter(actual => !expectSet.has(actual.lineName))
		.map(actual => {
			return {
				...actual,
				checkAt: useFormatDate(actual.checkAt!)
			}
		})
})

function toggleShowExpected() {
	showExpected.value = !showExpected.value
}

</script>

<template>
	<div class="flex flex-col items-center justify-center space-y-5 overflow-x-auto w-full">
		<h2 class="text-2xl">{{ showExpected ? '預計名單的出席狀況' : '預計名單外的出席者'}}</h2>
		<button class="btn-lg btn-primary rounded-lg" @click="toggleShowExpected">
			{{ showExpected ? '查看未在預計名單內的出席者' : '查看預計名單內的出席狀況'}}
		</button>
		<table class="table table-zebra w-full">
			<!-- head -->
			<thead>
				<tr class="hidden sm:table-row">
					<th>Name</th>
					<th>簽到時間</th>
					<th>準時</th>
				</tr>
			</thead>
			<tbody>
				<tr
					class="flex flex-col sm:table-row"
					v-for="attender in attenders"
					:key="attender.lineUserId"
				>
					<td class="flex-1 flex justify-center rounded-bl-none sm:table-cell">
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="mask mask-squircle w-12 h-12">
									<img v-if="attender.avatarUrl" :src="attender.avatarUrl" class="skeleton" loading="lazy"/>
									<img v-else src="@/assets/images/default-avatar.svg" class="skeleton" loading="lazy"/>
								</div>
							</div>
							<div>
								<div class="font-bold">{{ attender.lineName }}</div>
							</div>
						</div>
					</td>

					<td>
						<span class="mt-4 badge badge-ghost badge-sm border sm:mt-0" 
							:class="{ 'text-red-500': !attender.checkAt}"
						>{{ attender.checkAt || '未到' }}
						</span>
					</td>

					<td class="hidden sm:table-cell">
						<IconCheck v-if="attender.checkAt && attender.checkAt < partyDate"/>
						<IconCross v-else/>
					</td>
				</tr>

			</tbody>
		</table>
	</div>
</template>

<style>
.skeleton {
	opacity: .7;
	animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
	0% {
		background-color: hsl(200,20%,70%);
	}

	100% {
		background-color: hsl(200,20%,95%);
	}
}

</style>