export const KnownDidRegistries = [
  {
    'name': 'DCC Pilot Registry',
    'url': 'https://digitalcredentials.github.io/issuer-registry/registry.json'
  },
  {
    'name': 'DCC Sandbox Registry',
    'url': 'https://digitalcredentials.github.io/sandbox-registry/registry.json'
  },
  {
    'name': 'DCC Community Registry',
    'url': 'https://digitalcredentials.github.io/community-registry/registry.json'
  },
  {
    'name': 'DCC Registry',
    'url': 'https://digitalcredentials.github.io/dcc-registry/registry.json'
  }
];

export const DeepLinkConfig = {
  schemes: {
    customProtocol: ['dccrequest://', 'org.dcconsortium://'],
    universalAppLink: 'https://lcw.app/mobile'
  }
};
