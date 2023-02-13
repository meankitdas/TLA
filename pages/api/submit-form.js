const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { name, message, from, to, diffDays } = JSON.parse(req.body);
    const fromDate = new Date(from);
    const toDate = new Date(to);
    
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        From: {
          date: {
            start: fromDate.toISOString(),
          },
        },
        To: {
          date: {
            start: toDate.toISOString(),
          },
        },
        Days: {
          number: diffDays,

        }
      },
    });

    

    res.status(201).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error" });
  }
}
