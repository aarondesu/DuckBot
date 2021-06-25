import axios from 'axios';

export async function dog() {
  try {
    type dogRes = {
      message: string;
    };

    const result = await axios.request<dogRes>({
      url: 'https://dog.ceo/api/breeds/image/random',
    });

    return result.data.message;
  } catch (error) {
    throw new Error(error);
  }
}

export async function cat() {
  try {
    type catRes = {
      file: string;
    };

    const result = await axios.request<catRes>({
      url: 'https://aws.random.cat/meow',
    });
    return result.data.file;
  } catch (error) {
    throw new Error(error);
  }
}

export async function bunny() {
  try {
    type bunnyRes = {
      media: {
        poster: string;
      };
    };

    const result = await axios.request<bunnyRes>({
      url: 'https://api.bunnies.io/v2/loop/random/?media=gif,png',
    });

    return result.data.media.poster;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fox() {
  try {
    type foxRes = {
      image: string;
    };

    const result = await axios.request<foxRes>({
      url: 'https://randomfox.ca/floof/',
    });

    return result.data.image;
  } catch (error) {
    throw new Error(error);
  }
}

export async function shiba() {
  try {
    const result = await axios.request({
      url: 'http://shibe.online/api/shibes',
    });

    return result.data as string;
  } catch (error) {
    throw new Error(error);
  }
}

export async function panda() {
  try {
    type pandaRes = {
      link: string;
    };

    const result = await axios.request<pandaRes>({
      url: 'https://some-random-api.ml/img/panda',
    });

    return result.data.link;
  } catch (error) {
    throw new Error(error);
  }
}

export async function duck() {
  try {
    type duckRes = {
      url: string;
    };

    const result = await axios.request<duckRes>({
      url: 'https://random-d.uk/api/v1/random?type=png',
    });

    return result.data.url;
  } catch (error) {
    throw new Error(error);
  }
}
