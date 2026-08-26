const pool = require("../db/postgres");

/* ============================================================
   STORE DOCUMENT CHUNK
============================================================ */

async function storeDocumentChunk({
  id,
  filename,
  content,
  metadata,
  embedding
}) {
  const vector = `[${embedding.join(",")}]`;

  const query = `
    INSERT INTO documents (
      id,
      filename,
      content,
      metadata,
      embedding
    )
    VALUES ($1, $2, $3, $4, $5::vector)
    RETURNING id;
  `;

  const values = [
    id,
    filename,
    content,
    metadata || {},
    vector
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}

/* ============================================================
   DELETE DOCUMENT
   Deletes ALL chunks belonging to one PDF
============================================================ */

async function deleteDocumentByFilename(filename) {
  if (!filename || !filename.trim()) {
    throw new Error("Filename is required");
  }

  const query = `
    DELETE FROM documents
    WHERE filename = $1
    RETURNING id;
  `;

  const result = await pool.query(query, [
    filename.trim()
  ]);

  return {
    filename: filename.trim(),
    deletedChunks: result.rowCount
  };
}

/* ============================================================
   GET DOCUMENTS
============================================================ */

async function getDocuments() {
  const query = `
    SELECT
      filename,
      MAX((metadata->>'pageCount')::int) AS pages,
      COUNT(*) AS chunks
    FROM documents
    GROUP BY filename
    ORDER BY filename ASC;
  `;

  const result = await pool.query(query);

  return result.rows;
}

/* ============================================================
   EXPORTS
============================================================ */

module.exports = {
  storeDocumentChunk,
  deleteDocumentByFilename,
  getDocuments
};