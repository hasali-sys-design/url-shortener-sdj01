<script lang="ts">
    import { applyAction, deserialize, enhance } from '$app/forms';
    import type { ActionData, PageProps } from './$types';

    let { data, form } =$props();
    let content = $state('')
    let loading = $state(false)
    
    const submitPaste = async () =>{
        loading = true
        
        try{
            const res = await fetch ('/api/paste', {method:'POST'})
            const { uploadUrl } = await res.json()
            
            
            const uploadRes = await fetch(uploadUrl, {
                method: 'PUT',
                body: content,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
        } catch(err){
            console.log(err)
        } finally {
            loading = false;
        }
    }
</script>

<h1>SDJ 01 + 02: URL Shortener/Paste Bin</h1>


<form method="POST" action="?/getS3SignedUrl" use:enhance={({ }) => {
    return async ({ result }) => {
        if(result.type === 'success'){
            const {uploadUrl, pasteId}:any = result.data
            const uploadRes = await fetch(uploadUrl, { method: 'PUT', body: content });
            
            if(!uploadRes.ok) {
                console.error('Upload Failed')
                return
            }
            const formData = new FormData()
            formData.append('pasteId', pasteId)

            const response = await fetch('?/finalize', {
                method:'POST',
                body: formData
            })

            if(!response.ok){
                console.error('Finalize Write Failed')
                return
            }
           
            const resResult = deserialize(await response.text())
            applyAction(resResult)      
        }  
    }
}}>
    <label for="paste">New Paste</label>
    <textarea name="paste" bind:value={content}></textarea>

    <!--
    SDJ01 
    <label>
        Long URL:
        <input type="text" name="long_url" required />
    </label> 
    -->

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