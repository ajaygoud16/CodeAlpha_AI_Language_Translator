from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

history = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():

    text = request.form["text"]
    language = request.form["language"]

    translated = GoogleTranslator(source='auto', target=language).translate(text)

    history.append({
        "input": text,
        "output": translated
    })

    return jsonify({"translated": translated})

@app.route("/history")
def get_history():
    return jsonify(history)

@app.route("/clear")
def clear_history():
    history.clear()
    return jsonify({"message": "History Cleared"})

if __name__ == "__main__":
    app.run(debug=True)