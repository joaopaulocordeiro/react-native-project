import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    },[])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Joao Paulo'
        });

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1"  />
          
          <SafeAreaView  style={style.container}>
            <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <Text style={style.project}>{project.title}</Text>
                )}
            />

            <TouchableOpacity 
                activeOpacity={0.6} 
                style={style.button} 
                onPress={handleAddProject}>
                    <Text style={style.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </> 
    ); 
} 

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },

    button: {
      backgroundColor: '#FFF',
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})