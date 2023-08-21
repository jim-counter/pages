interface SocialLinks {
  twitter: string;
  discord: string;
  telegram: string;
  github: string;
  reddit: string;
  medium: string;
  youtube: string;
  linkedin: string;
}

const EXTERNAL_ROUTES: {
  subspace: string;
  forum: string;
  gemini2guide: string;
  docs: string;
  social: SocialLinks;
} = {
  subspace: 'https://subspace.network/',
  forum: 'https://forum.subspace.network/',
  gemini2guide: 'https://forum.subspace.network/t/how-to-check-your-balance-for-gemini-ii-incentivized-testnet/1081',
  docs: 'https://docs.subspace.network/',
  social: {
    twitter: 'https://twitter.com/NetworkSubspace',
    discord: 'https://discord.gg/subspace-network',
    telegram: 'https://t.me/subspace_network',
    github: 'https://github.com/subspace',
    reddit: 'https://www.reddit.com/r/subspace/',
    medium: 'https://medium.com/subspace-network',
    youtube: 'https://www.youtube.com/channel/UCojYRCZOtVTJHJXivOYJzeQ',
    linkedin: 'https://www.linkedin.com/company/subspace-blockchain',
  },
};

export default EXTERNAL_ROUTES;
