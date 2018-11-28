const blibliografiaService = require('./bibliografias');

const formatarListaNomes = blibliografiaService.formatarListaNomes;

var listaParam = [
    "josé PeReiRA da SilVA",
    "maRio QuintaDa dAs QuanTas FilhO",
    "Marina da neTo",
    "pedro filho",
    "MarIA JoSe",
    "aderbal",
    "Abū al-Qāsim Muḥammad ibn ʿAbd Allāh ibn ʿAbd al-Muṭṭalib ibn Hāshim"
];

formatarListaNomes(5, listaParam);