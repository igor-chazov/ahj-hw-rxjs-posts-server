const faker = require('faker');

faker.locale = 'ru';

class PostsGenerator {
  constructor() {
    this.posts = [];
    this.comments = new Map();
  }

  generate() {
    this.posts = [];
    this.comments = new Map();

    const postsCount = Math.floor(Math.random() * 10) + 1;

    for (let i = 1; i <= postsCount; i += 1) {
      const post = {
        id: faker.datatype.uuid(),
        author_id: faker.datatype.uuid(),
        title: faker.lorem.words(),
        author: faker.name.findName(),
        avatar: PostsGenerator.generateAvatar(),
        image: PostsGenerator.generateImage(),
        created: Date.now(),
      };

      this.posts.push(post);
      this.generateComments(post.id);
    }
  }

  generateComments(postId) {
    const commentsCount = Math.floor(Math.random() * 3) + 1;
    const comments = [];

    for (let i = 1; i <= commentsCount; i += 1) {
      const comment = {
        id: faker.datatype.uuid(),
        post_id: postId,
        author_id: faker.datatype.uuid(),
        author: faker.name.findName(),
        avatar: PostsGenerator.generateAvatar(),
        content: faker.lorem.paragraph(),
        created: Date.now(),
      };

      comments.push(comment);
    }

    this.comments.set(postId, comments);
  }

  static generateAvatar() {
    const avatarSize = Math.floor(Math.random() * (55 - 50)) + 50;
    const avatarType = Math.floor(Math.random() * 2) + 1;
    const avatarFrom = {
      1: faker.image.avatar(),
      2: `https://placeimg.com/${avatarSize}/${avatarSize}/people`,
    };

    return avatarFrom[avatarType];
  }

  static generateImage() {
    const imageSizeX = Math.floor(Math.random() * (600 - 550)) + 550;
    const imageSizeY = Math.floor(Math.random() * (350 - 300)) + 300;
    const imageType = Math.floor(Math.random() * 3) + 1;
    const imageFrom = {
      1: 'nature',
      2: 'arch',
      3: 'tech',
    };

    return `https://placeimg.com/${imageSizeX}/${imageSizeY}/${imageFrom[imageType]}`;
  }
}

module.exports = PostsGenerator;
