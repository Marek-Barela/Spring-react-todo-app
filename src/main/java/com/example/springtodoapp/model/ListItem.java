package com.example.springtodoapp.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ListItem {
	private final UUID id;
	private final String title;
	private final String description;

	public ListItem(@JsonProperty("id") UUID id,
	@JsonProperty("title") String title,
	@JsonProperty("description") String description) {
		this.id = id;
		this.title = title;
		this.description = description;
	}

	public UUID getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

}