<script lang="ts">
    import type { ActionData, PageProps } from './$types';
    let { data, form } =$props();
    let content = $state('')
    let loading = $state(false)
    let error = $state()

    const submitPaste = async () =>{
        loading = true
        error = null
        try{

            const res = await fetch ('/api/paste', {method:'POST'})
            const { uploadUrl } = await res.json()
            
            await fetch(uploadUrl, {
                method: 'PUT',
                body: content,
                headers: {
                    'Content-Type': 'text/plain'
                }
            } )
            console.log('UPLOAD STATUS:', res.status);

const text = await res.text();
console.log('UPLOAD RESPONSE:', text);
        } catch(err){
            error="Upload Failed"
        } finally {
            loading = false;
        }
    }
</script>
<h1>SDJ 01: URL Shortener</h1>

<label for="paste">New Paste</label>
<textarea name="paste" bind:value={content}></textarea>
<form method="POST">
    <label>
        Long URL:
        <input type="text" name="long_url" required />
    </label>

    <button type="submit" onclick={submitPaste}>{loading ? 'Uploading...' : 'Create Paste'}</button>
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