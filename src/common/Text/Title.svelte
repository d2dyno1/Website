<script>
    export let center = false;
</script>

<template>
    <h1 class="title" class:text-center={center}>
        <slot/>
    </h1>
</template>

<style lang="scss">
    .title {
        margin: 0;
        color: #0f0f0f;
        font-size: 72px;
        font-weight: 800;
        line-height: 1.4;
        &.text-center {
            text-align: center;
        }
    }
</style>