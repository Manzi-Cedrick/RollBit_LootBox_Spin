import {
    Badge,
    Box,
    Image,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Text
} from '@chakra-ui/react'
import {FaKey} from "react-icons/fa"
import React from 'react'
import {DEMO_LOOTBOX} from './config'

const LootBoxContent = () => {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4
    }

    return (<Box display="flex"
        height={360}
        mt={6}
        gap={12}
        position="relative">
        {
        DEMO_LOOTBOX.map((item, index) => (

            <Box key={index} bg={'#081324'}
                w={300}
                height={350}
                rounded={12}>
                <Box display={'flex'}
                    p={4}
                    px={12}
                    justifyContent={'space-between'}
                    roundedTop={12}
                    bg={'#142136'}>
                    <Text color={'#ffffff4d'}>NFT</Text>
                    <Text color={'#ffffff4d'}>0.4%</Text>
                </Box>
                <Box p={4}
                    px={12}
                    textAlign={'left'}>
                    <Box>
                        <Text color={'#ffffff'}
                            fontSize={20}
                            fontWeight={600}>#Loot Box</Text>
                        <Text color={'#ffffff5d'}
                            fontSize={14}
                            fontWeight={500}>NFT Rollbots. $1.45</Text>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <Image src={item.image}
                        w={100}
                        h={140}
                        rounded={12}/>
                </Box>

            </Box>
        ))
    } </Box>
    
    )
}

export default LootBoxContent
