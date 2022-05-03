package com.example.springtodoapp.api;

import com.example.springtodoapp.service.ListItemService;
import com.example.springtodoapp.model.ListItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/items")
@RestController
public class ListItemController {
	private final ListItemService listItemService;

	@Autowired
	public ListItemController(ListItemService listItemService) {
		this.listItemService = listItemService;
	}

	@PostMapping
	public void addListItem(@RequestBody ListItem listItem) {
		listItemService.addListItem(listItem);
	}

	@GetMapping
	public List<ListItem> getAllListItems() {
		return listItemService.getAllListItems();
	}

	@GetMapping(path = "{id}")
	public ListItem getListItemById(@PathVariable("id") UUID id) {
		return listItemService.getListItemById(id).orElse(null);
	}

	@DeleteMapping(path = "{id}")
	public void deleteListItemById(@PathVariable("id") UUID id) {
		listItemService.deleteListItemById(id);
	}

	@PutMapping(path = "{id}")
	public void updateListItemById(@PathVariable("id") UUID id, @RequestBody ListItem newListItem) {
		listItemService.updateListItemById(id, newListItem);
	}
}
