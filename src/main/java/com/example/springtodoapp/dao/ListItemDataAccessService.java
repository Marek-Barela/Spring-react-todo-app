package com.example.springtodoapp.dao;

import com.example.springtodoapp.model.ListItem;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class ListItemDataAccessService implements ListItemDao {
	private static List<ListItem> DB = new ArrayList<>();

	@Override
	public int insertListItem(UUID id, ListItem listItem) {
		DB.add(new ListItem(id, listItem.getTitle(), listItem.getDescription()));
		return 1;
	}

	@Override
	public List<ListItem> selectAllListItems() {
		return DB;
	}

	@Override
	public Optional <ListItem> selectListItemById(UUID id) {
		return DB.stream().filter(listItem -> listItem.getId().equals(id)).findFirst();
	}

	@Override
	public int updateListItemById(UUID id, ListItem listItem) {
		int index = DB.indexOf(selectListItemById(id).get());
		DB.set(index, new ListItem(id, listItem.getTitle(), listItem.getDescription()));
		return 1;
	}

	@Override
	public int deleteListItemById(UUID id) {
		int indexOfListItemToDelete = -1;
		for (int i = 0; i < DB.size(); i++) {
			if (DB.get(i).getId().equals(id)) {
				indexOfListItemToDelete = i;
				break;
			}
		}
		if (indexOfListItemToDelete >= 0) {
			DB.remove(indexOfListItemToDelete);
			return 1;
		}
		return 0;
	}
}
