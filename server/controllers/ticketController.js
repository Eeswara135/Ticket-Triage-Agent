const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const runAnalysis = (req, res) => {
  try {
    const ticket = [
      {
        id: 1,
        title: req.body.title || "",
        description: req.body.description || "",
      },
    ];

    const ticketsPath = path.join(
      __dirname,
      "../../python_ai/tickets.json"
    );

    fs.writeFileSync(
      ticketsPath,
      JSON.stringify(ticket, null, 2)
    );

    const processorPy = path.join(
      __dirname,
      "../../python_ai/processor.py"
    );

    console.log("REQ BODY:", req.body);

    exec(
      `python3 "${processorPy}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          console.error(stderr);

          return res.status(500).json({
            success: false,
            error: stderr || error.message,
          });
        }

        const jsonPath = path.join(
          __dirname,
          "../../output/results.json"
        );

        if (fs.existsSync(jsonPath)) {
          const data = fs.readFileSync(
            jsonPath,
            "utf8"
          );

          return res.json({
            success: true,
            output: data,
          });
        }

        return res.json({
          success: true,
          output: stdout,
        });
      }
    );
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  runAnalysis,
};
