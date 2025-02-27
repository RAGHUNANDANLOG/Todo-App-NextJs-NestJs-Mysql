import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const API_URL = "http://192.168.1.11:3001/todos"; // Change this if using a real serverexp:

type Todo = {
  id: number;
  task: string;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editTask.trim()) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editTask }),
      });
      setEditingId(null);
      setEditTask("");
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  
      if (!response.ok) {
        throw new Error("Failed to delete the task");
      }
  
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Input Field */}
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter task"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* To-Do List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editTask}
                  onChangeText={setEditTask}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleEdit(item.id)}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditingId(null)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.todoText}>{item.task}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setEditingId(item.id);
                      setEditTask(item.task);
                    }}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  inputGroup: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 5, marginRight: 10 },
  addButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  todoItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, borderBottomWidth: 1 },
  todoText: { fontSize: 16 },
  buttonGroup: { flexDirection: "row" },
  editButton: { backgroundColor: "#007bff", padding: 5, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: "#dc3545", padding: 5, borderRadius: 5 },
  saveButton: { backgroundColor: "#28a745", padding: 5, borderRadius: 5, marginRight: 5 },
  cancelButton: { backgroundColor: "#6c757d", padding: 5, borderRadius: 5 },
});

