type Song = {
  id: number;
  title: string;
  artist: string;
  producer: string;
  audio: string;
  cover: any;
  album: string;
  status: string;
  likes: number[];
  genre: string;
  edited: string;
  released: string;
};

type Playlist = {
  id: number;
  title: string;
  description: string;
  creator: string;
  audios: Song[];
};

type Album = {
  id: number;
  title: string;
  description: string;
  artist: string;
  cover: string;
  released: string;
};

type Genre = {
  // id: number;
  title: string;
  description: string;
};

type Profile = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_artist: boolean;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
