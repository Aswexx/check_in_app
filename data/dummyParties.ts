// @ts-nocheck

import crypto from 'crypto'
const dummyParties = [
  {
    title: '晚餐聚會',
    date: new Date('2023-09-16T18:30:00'),
    address: '台北市中山區林森北路310巷25號',
    location: { lat: 25.054212, lng: 121.526114 },
    expectedAttenders: ['John', 'Alice', 'Tom', 'Amy'],
    actualAttenders: []
  },
  {
    title: '公司年度慶祝會',
    date: new Date('2023-07-28T19:00:00'),
    address: '台北市南港區經貿二路85號',
    location: { lat: 25.059135, lng: 121.613494 },
    expectedAttenders: ['David', 'Jane', 'Eric', 'Lucy'],
    actualAttenders: []
  },
  {
    title: '早餐會議',
    date: new Date('2023-05-02T09:00:00'),
    address: '新北市永和區竹林路114號',
    location: { lat: 25.015291, lng: 121.516479 },
    expectedAttenders: ['Peter', 'Mike', 'Linda', 'Lisa'],
    actualAttenders: []
  },
  {
    title: '電影放映會',
    date: new Date('2023-08-08T19:30:00'),
    address: '台北市中正區重慶南路一段122號',
    location: { lat: 25.041799, lng: 121.518556 },
    expectedAttenders: ['Emily', 'Jack', 'Olivia', 'Brian'],
    actualAttenders: []
  },
  {
    title: '家庭聚會',
    date: new Date('2023-05-15T12:00:00'),
    address: '新北市淡水區中正東路109號',
    location: { lat: 25.166482, lng: 121.443708 },
    expectedAttenders: ['Kate', 'Frank', 'Sophia', 'Ethan'],
    actualAttenders: []
  },
  {
    title: '晚宴聚會',
    date: new Date('2023-06-25T18:00:00'),
    address: '台北市大安區復興南路二段199號',
    location: { lat: 25.026696, lng: 121.544478 },
    expectedAttenders: ['Kevin', 'Grace', 'Mark', 'Maggie'],
    actualAttenders: []
  },
  {
    title: '家族聚會',
    date: new Date('2023-02-16T05:32:00.000Z'),
    address: '台北市中山區南京東路二段128號',
    location: { lat: 25.0520357, lng: 121.5413784 },
    expectedAttenders: ['Tom', 'Jack', 'Emma', 'Lucy'],
    actualAttenders: []
  },
  {
    title: '瑜珈課程',
    date: new Date('2023-03-12T08:15:00.000Z'),
    address: '台北市信義區松壽路12號',
    location: { lat: 25.039774, lng: 121.574309 },
    expectedAttenders: ['Alice', 'Maggie', 'Cindy', 'Chris'],
    actualAttenders: []
  },
  {
    title: '公司會議',
    date: new Date('2023-03-28T11:00:00.000Z'),
    address: '台北市內湖區瑞光路26號',
    location: { lat: 25.0709859, lng: 121.5904572 },
    expectedAttenders: ['John', 'Peter', 'Mary', 'David'],
    actualAttenders: []
  },
  {
    title: '下午茶聚會',
    date: new Date('2023-03-10T07:30:00.000Z'),
    address: '新北市板橋區新站路11號',
    location: { lat: 25.010186, lng: 121.457172 },
    expectedAttenders: ['Olivia', 'Sophia', 'Nora', 'Grace'],
    actualAttenders: []
  },
  {
    title: '運動會',
    date: new Date('2023-04-15T09:00:00.000Z'),
    address: '台中市南區公益路45號',
    location: { lat: 24.1227352, lng: 120.6670689 },
    expectedAttenders: ['Jason', 'Steven', 'William', 'Sarah'],
    actualAttenders: []
  },
  {
    title: '寵物聚會',
    date: new Date('2023-01-05T06:45:00.000Z'),
    address: '新北市永和區永和路100號',
    location: { lat: 25.0111745, lng: 121.5169343 },
    expectedAttenders: ['Max', 'Lily', 'Buddy', 'Rocky'],
    actualAttenders: []
  },
  {
    title: '工作午餐',
    date: new Date('2023-04-15T06:30:00.000Z'),
    address: '台北市中正區忠孝東路一段100號',
    location: { lat: 25.043262, lng: 121.5194753 },
    expectedAttenders: ['Tom', 'Mary', 'John', 'Lucy'],
    actualAttenders: []
  },
  {
    title: '籃球比賽',
    date: new Date('2023-04-23T09:15:00.000Z'),
    address: '台南市北區中正路100號',
    location: { lat: 23.012765, lng: 120.2212233 },
    expectedAttenders: ['Kevin', 'Paul', 'James', 'Stephen', 'Kobe'],
    actualAttenders: []
  },
  {
    title: '品酒會',
    date: new Date('2023-05-10T13:30:00.000Z'),
    address: '台北市士林區基河路50號',
    location: { lat: 25.106896, lng: 121.526636 },
    expectedAttenders: ['Alice', 'Bob', 'Cathy', 'David'],
    actualAttenders: []
  },
  {
    title: '戶外野餐',
    date: new Date('2023-05-20T10:00:00.000Z'),
    address: '桃園市中壢區復興路200號',
    location: { lat: 24.968729, lng: 121.192014 },
    expectedAttenders: ['Amy', 'Jenny', 'Peter', 'Sam', 'Tony'],
    actualAttenders: []
  },
  {
    title: '討論會議',
    date: new Date('2023-03-25T15:45:00.000Z'),
    address: '台中市北區三民路50號',
    location: { lat: 24.157304, lng: 120.686147 },
    expectedAttenders: ['Lisa', 'Samuel', 'Frank', 'Grace', 'Olivia'],
    actualAttenders: []
  },
  {
    title: '會議',
    date: new Date('2023-05-21T10:30:00.000Z'),
    address: '台北市大安區信義路100號',
    location: { lat: 25.0339033, lng: 121.5623169 },
    expectedAttenders: ['John', 'Kate', 'David', 'Amy'],
    actualAttenders: []
  },
  {
    title: '家庭聚會',
    date: new Date('2023-06-15T12:00:00.000Z'),
    address: '台南市中西區民權路50號',
    location: { lat: 22.9952701, lng: 120.1965625 },
    expectedAttenders: ['Tom', 'Mary', 'Mike', 'Jane'],
    actualAttenders: []
  },
  {
    title: '生日派對',
    date: new Date('2023-06-23T16:00:00.000Z'),
    address: '台中市北區健行路100號',
    location: { lat: 24.1596259, lng: 120.6797021 },
    expectedAttenders: ['Alice', 'Bob', 'Cindy', 'Danny'],
    actualAttenders: []
  },
  {
    title: '聚餐',
    date: new Date('2023-03-10T18:30:00.000Z'),
    address: '高雄市左營區博愛路200號',
    location: { lat: 22.6610175, lng: 120.3118921 },
    expectedAttenders: ['Kelly', 'Sam', 'Eva', 'Jack'],
    actualAttenders: []
  },
  {
    title: '小型研討會',
    date: new Date('2023-03-18T14:00:00.000Z'),
    address: '台北市中正區重慶南路一段122號',
    location: { lat: 25.046318, lng: 121.516117 },
    expectedAttenders: ['Sophia', 'Henry', 'Olivia', 'Peter'],
    actualAttenders: []
  },
  {
    title: '午餐聚會',
    date: new Date('2023-02-23T04:20:00.000Z'),
    address: '台北市中正區重慶南路一段122號',
    location: { lat: 25.042606, lng: 121.517309 },
    expectedAttenders: ['John', 'David', 'Amy', 'Eva'],
    actualAttenders: []
  },
  {
    title: '週末小聚',
    date: new Date('2023-07-17T03:30:00.000Z'),
    address: '台中市南區忠明南路101號',
    location: { lat: 24.119052, lng: 120.658139 },
    expectedAttenders: ['Lucy', 'Emma', 'Oliver', 'Sophia'],
    actualAttenders: []
  },
  {
    title: '野餐聚會',
    date: new Date('2023-06-06T02:15:00.000Z'),
    address: '桃園市龜山區復興路101號',
    location: { lat: 25.052924, lng: 121.354861 },
    expectedAttenders: ['Tom', 'Jack', 'Kate', 'Rose'],
    actualAttenders: []
  },
  {
    title: '小組討論',
    date: new Date('2023-02-21T06:10:00.000Z'),
    address: '高雄市鼓山區美術東三路20號',
    location: { lat: 22.670369, lng: 120.297747 },
    expectedAttenders: ['Bill', 'Zoe', 'Alex', 'Katie'],
    actualAttenders: []
  },
  {
    title: '週末野餐',
    date: new Date('2023-08-12T08:30:00.000Z'),
    address: '台中市北屯區松竹路一段101號',
    location: { lat: 24.1864808, lng: 120.6648446 },
    expectedAttenders: ['Alex', 'Sophie', 'Emma', 'Oliver', 'Ava'],
    actualAttenders: []
  },
  {
    title: '小組報告討論',
    date: new Date('2023-06-15T13:00:00.000Z'),
    address: '台北市中正區羅斯福路四段一號',
    location: { lat: 25.0189835, lng: 121.5370194 },
    expectedAttenders: ['David', 'Emily', 'Grace', 'Lucy', 'Michael'],
    actualAttenders: []
  },
  {
    title: '桌遊聚會',
    date: new Date('2023-06-18T14:00:00.000Z'),
    address: '新北市板橋區文化路二段46巷10號',
    location: { lat: 25.0205957, lng: 121.4585718 },
    expectedAttenders: ['Olivia', 'Jacob', 'Mia', 'Noah', 'Ella'],
    actualAttenders: []
  },
  {
    title: '羽球比賽',
    date: new Date('2023-03-01T10:30:00.000Z'),
    address: '高雄市前鎮區新光路51號',
    location: { lat: 22.601667, lng: 120.3175 },
    expectedAttenders: [
      'Ethan',
      'Isabella',
      'Daniel',
      'Samantha',
      'William',
      'Natalie'
    ],
    actualAttenders: []
  },
  {
    title: '釣魚活動',
    date: new Date('2023-05-25T06:00:00.000Z'),
    address: '基隆市中正區信一路201號',
    location: { lat: 25.1314029, lng: 121.7432575 },
    expectedAttenders: ['Sophia', 'James', 'Liam', 'Chloe'],
    actualAttenders: []
  }
]

import { faker } from '@faker-js/faker'

function randomAbsenceInExpected(arr, k) {
  // 隨機缺席數超過預計名單長度，直接判定無人缺席
  if (k > arr.length) {
    return []
  }

  // 隨機缺席數等於預計名單長度，表示名單中全部缺席
  if (k === arr.length) {
    return [arr]
  }

  const results = []
  function comb(temp, start) {
    if (temp.length === k) {
      results.push(temp)
      return
    }
    for (let i = start; i < arr.length; i++) {
      comb([...temp, arr[i]], i + 1)
    }
  }
  comb([], 0)
  // 隨機選中可能結果中之一種
  const index = Math.floor(Math.random() * results.length)
  return results[index]
}


export function createFakeParties() {
  dummyParties.forEach((party) => {
    // 篩出過去時間
    // 隨機 1~5 個名單外出席者
    if (party.date < new Date()) {
      const randomCount = Math.ceil(Math.random() * 6)
      const checkableBoundary = party.date.getHours() - 1
      const lateBoundary = party.date.getHours() + 1
      for (let index = 0; index < randomCount; index++) {
        party.actualAttenders.push({
          lineUserId: crypto.randomUUID(),
          lineName: faker.name.fullName(),
          avatarUrl: faker.image.avatar(),
          checkAt: faker.date.between(
            new Date(party.date).setHours(checkableBoundary),
            new Date(party.date).setHours(lateBoundary)
          )
        })
      }

      // 隨機 0~2 個缺席
      const randomAbsenceCount = Math.floor(Math.random() * 3)
      const randomAbsenceResult = randomAbsenceInExpected(
        party.expectedAttenders,
        randomAbsenceCount
      )

      const absenceMap = {}
      randomAbsenceResult.forEach(r => {
        absenceMap[r] = true
      })

      party.expectedAttenders.forEach(ea => {
        if (absenceMap[ea]) return
        party.actualAttenders.push({
          lineUserId: crypto.randomUUID(),
          lineName: ea,
          avatarUrl: faker.image.avatar(),
          checkAt: faker.date.between(
            new Date(party.date).setHours(checkableBoundary),
            new Date(party.date).setHours(lateBoundary)
          )
        })
      })
    }
  })
  return dummyParties
}