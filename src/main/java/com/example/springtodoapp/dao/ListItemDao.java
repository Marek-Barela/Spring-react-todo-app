package com.example.springtodoapp.dao;

import com.example.springtodoapp.model.ListItem;

import java.util.UUID;
import java.util.List;
import java.util.Optional;

public interface ListItemDao {
	int insertListItem(UUID id, ListItem listItem);

	default int insertListItem(ListItem listItem ) {
		UUID id = UUID.randomUUID();
		return insertListItem(id, listItem);
	}

	Optional<ListItem> selectListItemById(UUID id);

	List<ListItem> selectAllListItems();

	int deleteListItemById(UUID id);

	int updateListItemById(UUID id, ListItem listItem);
}