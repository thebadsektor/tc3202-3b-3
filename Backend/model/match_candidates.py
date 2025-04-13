# match_candidates.py
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import numpy as np

# Optional mapping
value_mapping = {
    "populist": "proactive engagement",
    "pro-labor": "compassion",
    "pro-business": "creativity",
    "religious": "altruism",
    "law-and-order": "responsibility",
    "conservative": "responsibility"
}

def map_values(values_list):
    return [value_mapping.get(v.lower(), v.lower()) for v in values_list]

def values_to_vector(values, all_possible_values):
    vector = np.zeros(len(all_possible_values))
    for v in values:
        if v in all_possible_values:
            vector[all_possible_values.index(v)] = 1
    return vector

def match_candidates(user_values, csv_path='senator_candidates.csv'):
    user_values = [v.lower() for v in user_values]

    df = pd.read_csv(csv_path)
    df = pd.DataFrame(df, columns=["candidate_name", "party", "inferred_values"])
    df["mapped_values"] = df["inferred_values"].apply(map_values)

    all_possible_values = list(set([val for sublist in df["mapped_values"].tolist() for val in sublist] + user_values))

    candidate_vectors = np.array([values_to_vector(values, all_possible_values) for values in df["mapped_values"]])
    user_vector = np.array(values_to_vector(user_values, all_possible_values)).reshape(1, -1)

    knn = NearestNeighbors(n_neighbors=5, metric='cosine')
    knn.fit(candidate_vectors)

    distances, indices = knn.kneighbors(user_vector)
    top_matches = df.iloc[indices[0]].copy()
    top_matches.loc[:, "distance"] = distances[0]

    return top_matches[["candidate_name", "party", "distance"]].to_dict(orient="records")
