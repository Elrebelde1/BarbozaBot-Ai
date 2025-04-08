import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command, text }) => {

if (!text) return m.reply(`🍭 Ingresa Un Texto Para Buscar En Youtube\n> *Ejemplo:* ${usedPrefix + command}Edist sumi`);

try {
let api = await (await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`)).json();

let results = api.data[0];

let txt = `✨ *Título:* ${results.title}\n⌛ *Duración:* ${results.duration}\n📎 *Link:* ${results.url}\n📆 *Publicado:* ${results.publishedAt}`;

let img = results.image;

conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: m });

let api2 = await(await fetch(`https://mahiru-shiina.vercel.app/download/ytmp3?url=${results.text}&quality=480p&apikey=elrebelde21`)).json();

if (!api2?.result.dl_url) return m.reply('No Se  Encontraron Resultados');

await conn.sendMessage(m.chat, { document: { url: api2.result.dl_url }, mimetype: 'audio/mpeg', fileName: `${api2.result.title}.mp3` }, { quoted: m });

} catch (e) {
m.reply(`Error: ${e.message}`);
m.react('✖️');
  }
}

handler.command = ['play', 'pdoc'];

export default handler