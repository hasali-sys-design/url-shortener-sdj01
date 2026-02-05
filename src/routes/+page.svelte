<script lang="ts">
    import type { PageProps } from './$types';
    let { data }: PageProps =$props();
</script>
<h1>SDJ 01: URL Shortener</h1>



<form method="POST">
    <label>
        Long URL:
        <input type="url" name="long_url" required />
    </label>
    <button type="submit">Get Shortened URL</button>
</form>