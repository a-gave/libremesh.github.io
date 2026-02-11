<script setup>
import { data as meetings } from '/meetings.data.js'
let meetings_list = meetings.reverse().slice(1)
</script>

# All LibreMesh meetings

<ul>
  <li v-for="post of meetings_list">
    <a :href="post.url">
      {{ post.url.replace('/meetings/','').replace('.html','') }} - {{ post.frontmatter.title || 'LibreMesh Meeting' }}
    </a>
  </li>
</ul>
