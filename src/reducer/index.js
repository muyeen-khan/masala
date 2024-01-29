export default function taskReducer(tasks, action) {
  switch (action.type) {
    case "deleted": {
      return [];
    }

    case "edited": {
      return tasks.map((task) => {
        if (task.id === action.editable.id) {
          return {
            ...action.editable,
            title: action.inputFields.title,
            description: action.inputFields.description,
            tags: action.inputFields.tags.includes(",")
              ? action.inputFields.tags.split(",")
              : action.inputFields.tags,
            priority: action.inputFields.priority,
          };
        } else return task;
      });
    }

    case "added": {
      return [
        ...tasks,
        {
          ...action.inputFields,
          isFavorite: false,
          id: crypto.randomUUID(),
          tags: action.inputFields.tags.split(","),
        },
      ];
    }
    case "favDone": {
      return tasks.map((t) => {
        if (t.id === action.payload.id) {
          return { ...action.payload, isFavorite: !action.payload.isFavorite };
        } else {
          return t;
        }
      });
    }
    case "singleDeleted": {
      return action.payload;
    }

    default:
      break;
  }
}
