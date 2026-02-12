<script lang="ts">
    import type { ActionData, PageProps } from './$types';
    let { form } =$props();
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
    <h3>Your Shortened URL: <span><a href="https://localhost:5173/{form.shortUrlSuffix}" >https://localhost:5173/{form.shortUrlSuffix}</a></span></h3>
</div>
{/if}
{#if form?.error}
  <p class="error">{form.message}</p>
{/if}