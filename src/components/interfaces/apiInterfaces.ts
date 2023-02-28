export interface IResponseArtist {
  external_urls: {
    spotify: string;
  };
  followers?: {
    href: string;
    total: number;
  };
  genres?: string[];
  href: string;
  id: string;
  images?: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
}

export interface IResponseAlbum {
  album_type: string;
  artists: IResponseArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface IResponseTrack {
  album?: {
    album_type: string;
    artists: [
      {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: IResponseArtist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids?: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playavle?: boolean;
  name: string;
  popularity?: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface ISearchResult {
  albums: {
    href: string;
    items: IResponseAlbum[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
  artists: {
    href: string;
    items: IResponseArtist[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
  tracks: {
    href: string;
    items: IResponseTrack[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
}

export interface ICategory {
  href: string;
  icons: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  id: string;
  name: string;
}

export interface IPlaylists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: IPlaylistsItems[];
}

export interface IPlaylistsItems {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface IPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: [
      {
        added_at: string;
        added_by: {
          external_urls: {
            spotify: string;
          };
          followers: {
            href: string;
            total: number;
          };
          href: string;
          id: string;
          type: string;
          uri: string;
        };
        is_local: boolean;
        track: {
          album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            images: [
              {
                url: string;
                height: number;
                width: number;
              }
            ];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions: {
              reason: string;
            };
            type: string;
            uri: string;
            copyrights: [
              {
                text: string;
                type: string;
              }
            ];
            external_ids: {
              isrc: string;
              ean: string;
              upc: string;
            };
            genres: string[];
            label: string;
            popularity: number;
            album_group: string;
            artists: [
              {
                external_urls: {
                  spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
              }
            ];
          };
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              followers: {
                href: string;
                total: number;
              };
              genres: string[];
              href: string;
              id: string;
              images: [
                {
                  url: string;
                  height: number;
                  width: number;
                }
              ];
              name: string;
              popularity: number;
              type: string;
              uri: string;
            }
          ];
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_ids: {
            isrc: string;
            ean: string;
            upc: string;
          };
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          is_playable: boolean;
          linked_from: {};
          restrictions: {
            reason: string;
          };
          name: string;
          popularity: number;
          preview_url: string;
          track_number: 0;
          type: string;
          uri: string;
          is_local: boolean;
        };
      }
    ];
  };
  type: string;
  uri: string;
}

export interface IAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  copyrights: [
    {
      text: string;
      type: string;
    }
  ];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  artists: [
    {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      genres: string[];
      href: string;
      id: string;
      images: [
        {
          url: string;
          height: number;
          width: number;
        }
      ];
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }
  ];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: [
      {
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }
        ];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          type: string;
          uri: string;
        };
        restrictions: {
          reason: string;
        };
        name: string;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      }
    ];
  };
}

export interface IArtistsAlbums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: [
    {
      album_type: string;
      total_tracks: number;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: [
        {
          url: string;
          height: number;
          width: number;
        }
      ];
      name: string;
      release_date: string;
      release_date_precision: string;
      restrictions: {
        reason: string;
      };
      type: string;
      uri: string;
      copyrights: [
        {
          text: string;
          type: string;
        }
      ];
      external_ids: {
        isrc: string;
        ean: string;
        upc: string;
      };
      genres: string[];
      label: string;
      popularity: number;
      album_group: string;
      artists: [
        {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }
      ];
    }
  ];
}

export interface IArtistsTopTrecks {
  tracks: IResponseTrack[];
}

export interface ISavedTracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: [
    {
      added_at: string,
      track: {
        album: {
          album_type: string;
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }
          ];
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: [
            {
              url: string;
              height: number;
              width: number;
            }
          ];
          name: string;
          release_date: string;
          release_date_precision: string;
          total_tracks: number;
          type: string;
          uri: string;
        };
        artists: IResponseArtist[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
      }
    }
  ]
}

export interface IRelativeArtists {
  artists: IResponseArtist[];
}
