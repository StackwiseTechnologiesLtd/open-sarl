import { describe, expect, it } from "vitest";
import {
  linkedInArticles,
  linkedInArticlesMissingUrl,
  linkedInArticlesWithUrl,
} from "./linkedin-articles";

describe("linkedin-articles catalog", () => {
  it("loads 16 posts from converted xlsx", () => {
    expect(linkedInArticles.items).toHaveLength(16);
    expect(linkedInArticles.items[0]?.post).toBe(1);
    expect(linkedInArticles.columns).toEqual(["post", "topic", "url"]);
  });

  it("tracks missing URLs separately", () => {
    expect(linkedInArticlesWithUrl()).toHaveLength(15);
    expect(linkedInArticlesMissingUrl()).toEqual([
      expect.objectContaining({ post: 4, topic: expect.stringContaining("FIDIC") }),
    ]);
  });
});
