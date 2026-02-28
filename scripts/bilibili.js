// source/js/bilibili.js
hexo.extend.tag.register('bilibili', function(args) {
  const bvid = args[0];
  const width = args[1] || '800';
  const height = args[2] || '450';
  return `<iframe src="//player.bilibili.com/player.html?bvid=${bvid}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
});
