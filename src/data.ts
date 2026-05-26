import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'douala',
    name: 'DOUALA',
    subtext: 'CAMEROUN',
    dateText: '24 - 26 SEPTEMBRE 2026',
    // Set to 24th September 24-26, 2026
    targetDate: new Date('2026-09-24T09:00:00'),
    description: "Le premier rendez-vous de l'innovation sportive en Afrique Centrale. Le Sportix Salon Douala réunira les leaders d'opinion, les marques emblématiques, les start-ups technologiques et les décideurs institutionnels pour structurer l'avenir de notre salon-écosystème.",
    phones: ['+237 694 88 50 86', '+237 654 15 24 99'],
    reachedCount: 4850,
    infoCards: [
      { title: 'CONFÉRENCIERS', value: '45+', description: 'Experts internationaux' },
      { title: 'PARTICIPANTS', value: '2,500+', description: 'Professionnels attendus' },
      { title: 'START-UPS', value: '30+', description: 'Pitch innovations' },
    ],
    position: { top: '8%', left: '50%' },
  },
  {
    id: 'yaounde',
    name: 'YAOUNDÉ',
    subtext: 'CAMEROUN',
    dateText: 'MARS 2027',
    targetDate: new Date('2027-03-20T09:00:00'),
    description: "La capitale camerounaise accueille le salon pour débattre de la gouvernance du sport, de l'optimisation des structures sportives nationales et du développement de solutions de financement durables.",
    phones: ['+237 694 88 50 86', '+237 654 15 24 99'],
    reachedCount: 3120,
    infoCards: [
      { title: 'CONFÉRENCIERS', value: '35+', description: 'Leaders régionaux' },
      { title: 'PARTICIPANTS', value: '1,800+', description: 'Délégués nationaux' },
      { title: 'FORUMS', value: '5', description: 'Ateliers thématiques' },
    ],
    position: { top: '32%', left: '15%' },
  },
  {
    id: 'abidjan',
    name: 'ABIDJAN',
    subtext: 'CÔTE D\'IVOIRE',
    dateText: 'NOVEMBRE 2027',
    targetDate: new Date('2027-11-10T09:00:00'),
    description: "Dans le sillage des performances ivoiriennes, Abidjan s'impose comme le pôle ouest-africain de la diplomatie sportive. Découvrez les opportunités de partenariat public-privé et de valorisation des talents locaux.",
    phones: ['+225 07 07 49 11 88 66', '+237 656 87 36 26'],
    reachedCount: 7215,
    infoCards: [
      { title: 'CONFÉRENCIERS', value: '50+', description: 'Invités de marque' },
      { title: 'PARTICIPANTS', value: '3,000+', description: 'Salon-écosystème africain' },
      { title: 'DÉCIDEURS', value: '100+', description: 'Clubs et fédérations' },
    ],
    position: { top: '32%', left: '85%' },
  },
  {
    id: 'cotonou',
    name: 'COTONOU',
    subtext: 'BÉNIN',
    dateText: 'AVRIL 2027',
    targetDate: new Date('2027-04-18T09:00:00'),
    description: "Cotonou portera le flambeau de la formation athlétique d'élite. Un salon entièrement axé sur l'essor des académies, la médecine sportive, l'analyse de données de performance et l'insertion professionnelle.",
    phones: ['+229 97 53 31 73', '+237 656 87 36 26'],
    reachedCount: 1940,
    infoCards: [
      { title: 'CONFÉRENCIERS', value: '30+', description: 'Coaches et préparateurs' },
      { title: 'PARTICIPANTS', value: '1,500+', description: 'Jeunes et encadrants' },
      { title: 'DÉMONSTRATIONS', value: '12', description: 'Pratiques de terrain' },
    ],
    position: { top: '70%', left: '26%' },
  },
  {
    id: 'nairobi',
    name: 'CAN 2027',
    subtext: 'NAIROBI, KENYA',
    dateText: 'JUILLET 2027',
    targetDate: new Date('2027-07-12T09:00:00'),
    description: "En marge de la Coupe d'Afrique des Nations (CAN) 2027 à Nairobi, cette édition spéciale explorera le sport tech en Afrique de l'Est, la production audiovisuelle moderne et l'engagement des fans connectés.",
    phones: ['+237 656 87 36 26', '+237 6 95 61 71 15 82'],
    reachedCount: 5830,
    infoCards: [
      { title: 'CONFÉRENCIERS', value: '60+', description: 'Spécialistes média/tech' },
      { title: 'PARTICIPANTS', value: '4,000+', description: 'Visiteurs internationaux' },
      { title: 'MARQUES', value: '50+', description: 'Exposants de pointe' },
    ],
    position: { top: '70%', left: '74%' },
  },
  {
    id: 'casablanca',
    name: 'CASABLANCA',
    subtext: 'MAROC',
    dateText: 'MAI 2028',
    targetDate: new Date('2028-05-15T09:00:00'),
    description: "L'édition de Casablanca réunira le sport d'élite, l'expertise technologique marocaine et les grandes alliances de l'industrie du football et des infrastructures de la Coupe du Monde.",
    phones: ['+212 675 06 02 17', '+237 656 87 36 26'],
    reachedCount: 2650,
    infoCards: [
      { title: 'CONFÉRENCIERS', value: '40+', description: 'Leaders régionaux et mondiaux' },
      { title: 'PARTICIPANTS', value: '2,000+', description: 'Professionnels attendus' },
      { title: 'INVESTISSEURS', value: '15+', description: 'Fonds et grands projets' },
    ],
    position: { top: '85%', left: '50%' },
  },
];

export const TOPICS = [
  {
    title: 'Sports Tech & Data',
    description: 'Analyse de performance, capteurs intelligents, IoT et intelligence artificielle appliquée au coaching de haut niveau.',
    icon: 'Cpu',
  },
  {
    title: 'Retransmission & Médias',
    description: "Diffusion de nouvelle génération, réalité virtuelle, plateformes OTT, narration numérique et droits de diffusion d'événements.",
    icon: 'Radio',
  },
  {
    title: 'Infrastructures & Arenas',
    description: 'Conception de stades intelligents, architecture écologique, gestion des flux, sécurité des enceintes et expérience des fans.',
    icon: 'Building2',
  },
  {
    title: 'Économie & Sponsoring',
    description: 'Nouveaux modèles de revenus pour les clubs locaux, partenariats de marques prestigieuses, mécénat et diplomatie économique.',
    icon: 'TrendingUp',
  },
];
