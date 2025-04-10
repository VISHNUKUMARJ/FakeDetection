import torch
from transformers import GPT2LMHeadModel, GPT2TokenizerFast
import numpy as np

tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
model.eval()

def calculate_perplexity(text):
    encodings = tokenizer(text, return_tensors="pt")
    max_length = model.config.n_positions
    stride = 512

    lls = []
    for i in range(0, encodings.input_ids.size(1), stride):
        begin_loc = max(i + stride - max_length, 0)
        end_loc = min(i + stride, encodings.input_ids.size(1))
        trg_len = end_loc - i
        input_ids = encodings.input_ids[:, begin_loc:end_loc]
        target_ids = input_ids.clone()
        target_ids[:, :-trg_len] = -100

        with torch.no_grad():
            outputs = model(input_ids, labels=target_ids)
            log_likelihood = outputs.loss * trg_len

        lls.append(log_likelihood)

    ppl = torch.exp(torch.stack(lls).sum() / end_loc)
    return ppl.item()

def check_fake_text(text):
    perplexity = calculate_perplexity(text)
    is_fake = perplexity < 40  # threshold (tune this)

    return {
        "is_fake": is_fake,
        "perplexity_score": round(perplexity, 2),
        "message": "Text is highly predictable (AI-like)" if is_fake else "Text appears human-written"
    }
