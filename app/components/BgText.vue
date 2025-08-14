<template>
	<div class="bg-text" aria-hidden="true">
		<div v-for="i in rowsCount" :key="i" class="bg-row">
			{{ repeatedLine }}
		</div>
	</div>
</template>

<script setup lang="ts">
const phrases = [
	'现在我明白了问题所在',
	'现在我已经修复了实现',
	'我发现问题了',
	'你说得对',
	'现在我完全明白问题所在了',
	'现在我明白问题了',
	'现在我已经修复了关键问题',
	'你说得对，我需要仔细检查',
	'找到问题了',
	'完成'
]

const unit = phrases.join(' · ')
// 重复足够多次，保证在任意视口宽度下横向连续
const repeatedLine = Array.from({ length: 20 }).map(() => unit).join(' · ')
// 按旋转后的覆盖面积准备多行，确保填满
const rowsCount = 40
</script>

<style scoped>
.bg-text{
	position: fixed;
	top: -50vh;
	left: -50vw;
	width: 300vw;
	height: 300vh;
	z-index: -3; /* 在叠加暗层(::after)之下 */
	transform: rotate(-45deg);
	pointer-events: none;
	user-select: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 16px;
}
.bg-row{
	white-space: nowrap;
	font-weight: 600;
	/* 自适应字号，桌面更大，移动略小 */
	font-size: clamp(14px, 1.6vw, 20px);
	letter-spacing: 0.5px;
	line-height: 1.9;
	color: rgba(255,255,255,0.2);
}
</style>

