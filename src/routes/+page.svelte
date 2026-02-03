<script lang="ts">
    import type { PageProps } from './$types';
    let { data }: PageProps =$props();
</script>
<h1>SDJ 01: URL Shortener</h1>

<div>
    <h3>Database Time: {data?.db_time}</h3>
</div>

<form method="POST">
    <label>
        Long URL:
        <input type="url" name="long_url" required />
    </label>
    <button type="submit">Get Shortened URL</button>
</form>