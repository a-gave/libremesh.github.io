<script setup>
import { data as news } from '/news.data.js'
import { useData } from 'vitepress'

const { site } = useData()

let news_list = news.reverse().slice(1)
</script>

# News

<ul>
  <li v-for="post,i of news_list">
    <a :href="'./'+post.url.replace('/news/', '').replace('.html','')">
      {{ post.url.replace('/news/','').replace('.html','') }}{{ post.frontmatter.title  && (' - '+post.frontmatter.title) || '' }}
    </a>
  </li>
</ul>
