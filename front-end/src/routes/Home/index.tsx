import { generatePath, useNavigate } from 'react-router-dom';
import { Wrapper, IconCard, HomeOption, BotCard, TopCard, TextCard, OptionContainer, OptionRow, OptionCol, Header} from './Home.styles'
import endpoints from '@constants/routes/admin';

function Home() {
    const navigate = useNavigate()

    const onClick = (path: string) => {
        navigate(path)
    }

    return (
    <Wrapper>

        <Header to="#home">Home</Header>

        <OptionContainer>
            <OptionRow>
                <OptionCol>
                    <HomeOption onClick={() => onClick(generatePath(endpoints.patient))}>
                        <TopCard>
                            <IconCard className="fa-solid fa-hospital-user"></IconCard>
                        </TopCard>
                        <BotCard>
                            <TextCard>Patient</TextCard>
                        </BotCard>
                    </HomeOption>
                </OptionCol>

                <OptionCol>
                    <HomeOption onClick={() => onClick(generatePath(endpoints.doctor))}>
                        <TopCard>
                            <IconCard className="fa-solid fa-user-doctor"></IconCard>
                        </TopCard>
                        <BotCard>
                            <TextCard>Doctor</TextCard>
                        </BotCard>
                    </HomeOption>
                </OptionCol>

                <OptionCol>
                    <HomeOption onClick={() => onClick(generatePath(endpoints.prediction))}>
                        <TopCard>
                            <IconCard className="fa-solid fa-magnifying-glass-chart"></IconCard>
                        </TopCard>
                        <BotCard>
                            <TextCard>Prediction</TextCard>
                        </BotCard>
                    </HomeOption>
                </OptionCol>
            </OptionRow>

            <OptionRow>
                <OptionCol>
                    <HomeOption onClick={() => onClick(generatePath(endpoints.diagnosis))}>
                        <TopCard>
                            <IconCard className="fa-solid fa-stethoscope"></IconCard>
                        </TopCard>
                        <BotCard>
                            <TextCard>Diagnosis</TextCard>
                        </BotCard>
                    </HomeOption>
                </OptionCol>

                <OptionCol>
                    <HomeOption onClick={() => onClick(generatePath(endpoints.operation))}>
                        <TopCard>
                            <IconCard className="fa-solid fa-bed-pulse"></IconCard>
                        </TopCard>
                        <BotCard>
                            <TextCard>Operation</TextCard>
                        </BotCard>
                    </HomeOption>
                </OptionCol>

                <OptionCol>
                    <HomeOption onClick={() => onClick(generatePath(endpoints.checkup))}>
                        <TopCard>
                            <IconCard className="fa-solid fa-file-medical"></IconCard>
                        </TopCard>
                        <BotCard>
                            <TextCard>CheckUp</TextCard>
                        </BotCard>
                    </HomeOption>
                </OptionCol>
            </OptionRow>

        </OptionContainer>
    </Wrapper>
    );
}


export default Home