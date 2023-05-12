<script setup></script>

<template>
    <footer>
        <div class="flex flex-row justify-around gap-4 p-4">
            <section>
                Section 1
            </section>
            <div class="divider bg-neutral"></div>
            <section >
                Section 2
            </section>
            <div class="divider bg-neutral"></div>
            <section>
                Section 3
            </section>
        </div>

        <section class="text-center">
            Copyright (c)
        </section>

    </footer>
</template>

<style scoped> 
footer{
    @apply bg-gray-800 rounded-(tl-xl tr-xl) text-(xs slate-200) ;
}
section {
    @apply text-center;
}
</style>
