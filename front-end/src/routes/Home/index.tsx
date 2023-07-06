import { generatePath, useNavigate } from 'react-router-dom';
import { Wrapper, IconCard, HomeOption, BotCard, TopCard, TextCard, OptionContainer, Header} from './Home.styles'
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

function Home() {
    const Admin = usePermission("Admin")
    const navigate = useNavigate()

    const onClick = (path: string) => {
        navigate(path)
    }

    return (
    <Wrapper>

        <Header to="#home">Dashboard</Header>

        <OptionContainer>
            <HomeOption onClick={() => onClick(generatePath(endpoints.patient))}>
                <TopCard>
                    <IconCard className="fa-solid fa-hospital-user"></IconCard>
                </TopCard>
                <BotCard>
                    <TextCard>Pasien</TextCard>
                </BotCard>
            </HomeOption>

            <HomeOption onClick={() => onClick(generatePath(endpoints.prediction))}>
                <TopCard>
                    <IconCard className="fa-solid fa-magnifying-glass-chart"></IconCard>
                </TopCard>
                <BotCard>
                    <TextCard>Prediksi</TextCard>
                </BotCard>
            </HomeOption>

            <HomeOption onClick={() => onClick(generatePath(endpoints.diagnosis))}>
                <TopCard>
                    <IconCard className="fa-solid fa-stethoscope"></IconCard>
                </TopCard>
                <BotCard>
                    <TextCard>Diagnosa</TextCard>
                </BotCard>
            </HomeOption>

            <HomeOption onClick={() => onClick(generatePath(endpoints.operation))}>
                <TopCard>
                    <IconCard className="fa-solid fa-bed-pulse"></IconCard>
                </TopCard>
                <BotCard>
                    <TextCard>Operasi</TextCard>
                </BotCard>
            </HomeOption>

            <HomeOption onClick={() => onClick(generatePath(endpoints.checkup))}>
                <TopCard>
                    <IconCard className="fa-solid fa-file-medical"></IconCard>
                </TopCard>
                <BotCard>
                    <TextCard>Check Up</TextCard>
                </BotCard>
            </HomeOption>

            { Admin &&( 
                <HomeOption onClick={() => onClick(generatePath(endpoints.doctor))}>
                    <TopCard>
                        <IconCard className="fa-solid fa-user-doctor"></IconCard>
                    </TopCard>
                    <BotCard>
                        <TextCard>Dokter</TextCard>
                    </BotCard>
                </HomeOption>
            ) }

        </OptionContainer>
    </Wrapper>
    );
}


export default Home