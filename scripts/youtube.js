hexo.extend.tag.register('youtube', function(args) {
  const videoId = args[0];
  const width = args[1] || '800';
  const height = args[2] || '450';
  return `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
});
