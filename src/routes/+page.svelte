<script lang="ts">
    import type { ActionData, PageProps } from './$types';
    let { data, form } =$props();
</script>
<h1>SDJ 01: URL Shortener</h1>



<form method="POST">
    <label>
        Long URL:
        <input type="url" name="long_url" required />
    </label>
    <button type="submit">Get Shortened URL</button>
</form>
{#if form?.success}
<div>
    <h3>Your Shortened URL: <span><a href="{form.shortUrl}" >{form.shortUrl}</a></span></h3>
</div>
{/if}
<div>
    <h3>Short Url List</h3>
    {#each data.shortUrlList as suffix}
        <li>
            <a href="{data.origin}/{suffix.short_url}">{data.origin}/{suffix.short_url}</a>
        </li>
    {/each}
</div>