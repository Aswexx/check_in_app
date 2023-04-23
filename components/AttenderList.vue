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
		const mapped = expectedAttenders.map(name => {
			return {
				lineUserId: actualMap.get(name)?.lineUserId,
				lineName: name,
				avatarUrl: actualMap.get(name)?.avatarUrl,
				checkAt: actualMap.get(name)?.checkAt
			}
		})

		return mapped.sort((a, b) => Number(a.checkAt) - Number(b.checkAt))
	}

	return actualAttenders.filter(actual => !expectSet.has(actual.lineName))
})

function toggleShowExpected() {
	showExpected.value = !showExpected.value
}

</script>

<template>
	<div class="overflow-x-auto w-full">
		<h1>{{ showExpected ? '預計名單的出席狀況' : '預計名單外的出席者'}}</h1>
		<button class="btn-lg btn-primary rounded-lg" @click="toggleShowExpected">
			{{ showExpected ? '查看未在預計名單內的出席者' : '查看預計名單內的出席狀況'}}
		</button>
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Name</th>
					<th>簽到時間</th>
					<th>準時</th>
				</tr>
			</thead>
			<tbody>
				<tr 
					v-for="attender in attenders" 
					:key="attender.lineUserId"
				>
					<td>
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="mask mask-squircle w-12 h-12">
									<img :src="attender.avatarUrl" />
								</div>
							</div>
							<div>
								<div class="font-bold">{{ attender.lineName }}</div>
							</div>
						</div>
					</td>
					<td>
						<span class="badge badge-ghost badge-sm" 
							:class="{ 'text-red-500': !attender.checkAt}"
						>{{ attender.checkAt || '未到' }}
						</span>
					</td>
					<td>
						<IconCheck v-if="attender.checkAt && attender.checkAt < partyDate"/>
						<IconCross v-else/>
					</td>
				</tr>

				
			</tbody>
		</table>
	</div>
</template>