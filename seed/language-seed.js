const Language = require('../api/models/Language');
const sidebar = require('./components/sidebar');
require('../config/db');

// const seedSidebar = async () => {
//     for(let i = 0; i < sidebar.sidebar.length; i++){
//         sidebarSeeder = new Language({
//             page_name: "sidebar",
//             component_name: sidebar.sidebar[i].component_name,
//             text_ar: sidebar.sidebar[i].text_ar,
//             text_en: sidebar.sidebar[i].text_en
//         });
//         await sidebarSeeder.save();
//     }
// }
// seedSidebar();

const findAll = async () => {
    console.log(await Language.find({}));
}

findAll();
