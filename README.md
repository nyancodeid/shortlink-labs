# ShortLink Labs 🧐️
An `Experimental` ShortLink stored in Github Issues Comments

## Comment Body Format
Link that stored into issues comment was well formatted as `{short_id}:{base64(link)}`

For example  
`short_id` -> `blog`  
`link` -> `https://blog.nyan.my.id`

It's should stored as
`blog:aHR0cHM6Ly9ibG9nLm55YW4ubXkuaWQ=`

## Github Actions
We setup github actions will triggered on every new issues comment was created, then will generate all links from Issue Comments into `shortlinks.json`;
