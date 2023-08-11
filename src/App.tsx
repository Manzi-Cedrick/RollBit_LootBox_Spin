import React from 'react';
import logo from './logo.svg';
import './App.css';
import SpinPage from './lootbox/SpinPage';
import { Box, Text } from '@chakra-ui/react';
import LootBoxContent from './lootbox/LootBoxContent';
function App() {
    return (
        <div className="App">
            <SpinPage/>
            <Box display={'flex'} pt={40} justifyContent={'center'} flexDirection={'column'} alignItems={'start'} px={'12em'}>
                <Box>
                    <Text fontWeight={'bold'} textAlign={'left'} color={'white'}>LOOTBOX Content</Text>
                </Box>
                <LootBoxContent/>
            </Box>
        </div>
    );
}

export default App;
